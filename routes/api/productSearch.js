const express = require('express');
const router = express.Router();
const esHost = require('../../config/keys').elastic;
// ElasticSearch
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: esHost,
});
// Models
const Camera = require('../../models/camera');
const TV = require('../../models/tv');
const Phone = require('../../models/phone');
const Computer = require('../../models/computer');

const perPage = 10;
const fuzziness = 3;

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

function getSortAll(sort, toSort){
    switch(sort){
        case 'value':       return toSort.sort((a,b) => a.value - b.value);
        case 'valueDESC':   return toSort.sort((a,b) => b.value - a.value);
        case 'name':        return toSort.sort((a,b) => {   if(a.name < b.name) return -1;
                                                            if(a.name > b.name) return 1; return 0});
        case 'nameDESC':    return toSort.sort((a,b) => {   if(a.name > b.name) return -1;
                                                            if(a.name < b.name) return 1; return 0});
        case 'producer':    return toSort.sort((a,b) => {   if(a.producer < b.producer) return -1;
                                                            if(a.producer > b.producer) return 1; return 0});
        case 'producerDESC':return toSort.sort((a,b) => {   if(a.producer > b.producer) return -1;
                                                            if(a.producer < b.producer) return 1; return 0});
        default: return toSort.sort((a,b) => a._uid - b._uid);
    }
}

router.get('/search/:cat/', (req,res)=>{
    console.log("superSzukajka");
    const cat = req.params.cat
    var q = req.query.name;
    const p = req.query.page;
    const sort = getESSort(req.query.sort);

    if(q == undefined){
        q = '';
    }
    console.log(p,q,cat)
    var model;
    switch(cat){
        case 'cameras': 
            model = Camera;
            break;
            case 'tvs':
            model = TV;
            break;
        case 'computers':
            model = Computer;
            break;
        case 'phones':
        model = Phone;
            break;
            case 'all':
            model = null;            
            break;
            default:
            model = null;
            break;
        }
        if(model === null){
            search = {body: {
                from: p*perPage - perPage,
                size: perPage,
                sort: sort,
                query: {
                    match: {
                        name: {
                            query: `${q}`,
                            fuzziness: fuzziness
                        }
                    }
                },
            }}
            client.search({q: q}).then(respo => {
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
        from: p*perPage - perPage,
        size: perPage,
        sort,
        query: {
            match: {
                name: {
                    query: `${q}`,
                    fuzziness: fuzziness 
                }
            }
        }
    }
// for pagination to get total number of htis;
        model.esSearch({
            sort,
            query:{
                match:{
                    name:{
                        query: q,
                        fuzziness: fuzziness
                    }
                }
            }
        }, (err, respon) => {
            model.esSearch(search ,(err,result)=>{
                totalHits = respon.hits.total;
                console.log(search);
                console.log(`error: ${err}`);
                console.log(result);
                var r = result.hits.hits;
                if(r.length < 1){
                    r = [];
                };
                let pages = Math.ceil(totalHits/perPage);
                res.json({items: r, pages: pages});
            });
        });
    
        
    
}
});

// GET ALL FROM CATEGORY

router.get('/all/:cat',(req, res)=>{
    var model = 0;
    switch(req.params.cat){
        case 'cameras': 
            model = Camera;
            break;
        case 'tvs':
            model = TV;
            break;
        case 'computers':
            model = Computer;
            break;
        case 'phones':
            model = Phone;
            break;
        case 'all':
            
        default:
            model = 0;
            break;
    }
    const page = req.query.page;
    const sort = req.query.sort;
    if(model !== 0){
        model.paginate({}, {page: page, limit: perPage, sort:getSort(sort)}).then(result => res.json({items: result.docs, pages: result.pages}));
    }else{
        Promise.all([Camera.find(), TV.find(), Computer.find(), Phone.find()]).then(
            val => { 
                let products = val[0].concat(val[1], val[2], val[3]);
                products = getSortAll(sort, products);
                const pages = Math.ceil(products.length/perPage);
                res.json({items: products.slice(perPage*page - perPage,perPage*page), pages: pages});
            }).catch(err => res.json({success: false}));  
    }
});

module.exports = router;