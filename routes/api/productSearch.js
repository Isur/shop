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

const perPage = 5;

router.get('/search/:cat/', (req,res)=>{
    console.log("superSzukajka");
    const cat = req.params.cat
    var q = req.query.name;
    const p = req.query.page;
    const sort = req.query.sort;
    
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
                size: 5,
                query: {
                    match: {
                        name: {
                            query: `${q}`,
                            fuzziness: 1
                        }
                    }
                },
                sort: "value"
                
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
        size: 5,
        query: {
            match: {
                name: {
                    query: `${q}`,
                    fuzziness: 1 
                }
            }
        }
    }

        model.esSearch({
            query:{
                match:{
                    name:{
                        query: q,
                        fuzziness: 1
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
    if(model !== 0){
        model.paginate({}, {page: page, limit: perPage}).then(result => res.json({items: result.docs, pages: result.pages}));
    }else{
        Promise.all([Camera.find(), TV.find(), Computer.find(), Phone.find()]).then(
            val => { 
                const products = val[0].concat(val[1], val[2], val[3]);
                const pages = Math.ceil(products.length/perPage);
                res.json({items: products.slice(perPage*page - perPage,perPage*page), pages: pages});
            }).catch(err => res.json({success: false}));  
    }
});

module.exports = router;