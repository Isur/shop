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
// SEARCH

router.get('/search/:cat/:name', (req,res)=>{
    var model;
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
            model = null;            
            break;
        default:
            model = null;
            break;
    }
if(model === null){
    client.search({
        q: req.params.name
    }).then(resp => {
      if(resp.hits.hits.length < 1)
        res.json([])
      else res.json(resp.hits.hits);
    }).catch(err => res.json(err));
}else{
    var search =  {match:{
            name: {
                query: req.params.name,
                fuzziness: 2
            } 
        }}
    model.search(search ,(err,result)=>{
        console.log(`error: ${err}`);
        // if(result.hits.hits.length < 1){
        //     result.hits.hits = [];
        // };
        res.json(result.hits.hits)});}
})
// GET ALL FROM CATEGORY

router.get('all/:cat/:page',(req, res)=>{
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
    const page = req.params.page;
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
})



module.exports = router;