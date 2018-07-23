const express = require('express');
const router = express.Router();
const esHost = require('../../config/keys').elastic;
// ElasticSearch
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: esHost,
});
// Models
const Item = require('../../models/Item');

// CONST
const perPage = 10;
const fuzziness = 3;

// Sort: 
function getESSort(sort){
    switch(sort){
        case 'value':
            return [{ value: { order: "asc" }},
                    {_uid: {order: 'asc'}}]
        case 'valueDESC':
            return [{ value: { order: "desc" }},
                    {_uid: {order: 'asc'}}]
        default:
            return [{_uid: {order: 'asc'}}]
    }
}

function getSort(sort){

    switch(sort){
        case 'value':       return {value: "asc"};
        case 'valueDESC':   return {value: "desc"};
        case 'name':        return {name: "asc"};
        case 'nameDESC':    return {name: "desc"};
        case 'producer':    return {producer: "asc"};
        case 'producerDESC':return {producer: "desc"};
        default: return {_uid: "asc"};
    }
} 

// Get type:
getType = (cat) =>{
    switch(cat){
        case 'cameras': 
            return 'Camera';
        case 'tvs':
            return 'TV';
        case 'computers':
            return 'Computer';
        case 'phones':
            return 'Phone';
        case 'all':
        default:
            return '*';
    }
}
// SEARCH
router.get('/search/:cat/', (req,res)=>{
    const category = req.params.cat
    var query = req.query.name;
    const page = req.query.page;
    const sort = getESSort(req.query.sort);
    if(query == undefined)
        query = '';
    var type = getType(category).toLowerCase(); // elasticsearch filter need lowercase
    if(type === '*'){
        search = {body: {
            from: page*perPage - perPage,
            size: perPage,
            sort: sort,
            query: {
                match: {
                    name: {
                        query: `${query}`,
                        fuzziness: fuzziness
                    },
                }
            },
        }}
        // GET INFO FOR PAGINATION AND THEN GET RIGHT ITEMS 
        client.search({q: query}).then(respo => {
            totalHits = respo.hits.total
            client.search(
                search    
            ).then(resp => {
                var pages = Math.ceil(totalHits/perPage);
            if(resp.hits.hits.length < 1)
                res.json({items:[], pages: pages})
            else res.json({items:resp.hits.hits,pages:pages});
        }).catch(err => res.json(err))});
    }else{
        var search =  {
            from: page*perPage - perPage,
            size: perPage,
            sort,
            query:{
                bool:{
                    must:{
                        match:{
                            name: {
                                query: query,
                                fuzziness: fuzziness
                            }
                        }
                    },
                    filter:{
                        term:{
                            itemType: type
                        }
                    }
                }
            }
        }
// for pagination to get total number of htis;
        console.log(type);
        Item.esSearch({
            sort,
            query:{
                bool:{
                    must:{
                        match:{
                            name:{
                                query: query,
                                fuzziness: fuzziness
                            }
                        }
                    },
                    filter:{
                        term:{
                            itemType: type
                        }
                    }
                }
            }
        }, (err, respon) => {
            console.log(err);
            Item.esSearch(search ,(err,result)=>{
                totalHits = respon.hits.total;
                console.log(search);
                console.log(`error: ${err}`);
                console.log(result);
                var hits = result.hits.hits;
                if(hits.length < 1){
                    hits = [];
                };
                let pages = Math.ceil(totalHits/perPage);
                res.json({items: hits, pages: pages});
            });
        });
    }
});

// GET ALL FROM CATEGORY

router.get('/all/:cat',(req, res)=>{
    const category = req.params.cat;
    const page = req.query.page;
    const sort = req.query.sort;
    var type = getType(category);
    if(type !== '*')
        Item.paginate({itemType: type}, {page: page, limit: perPage, sort:getSort(sort)}).then(result => res.json({items: result.docs, pages: result.pages}));
    else
        Item.paginate({}, {page: page, limit: perPage, sort:getSort(sort)}).then(result => res.json({items: result.docs, pages: result.pages}));
});

module.exports = router;