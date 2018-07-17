const express = require('express');
const router = express.Router();

// Models
const Camera = require('../../models/camera');
const TV = require('../../models/tv');
const Phone = require('../../models/phone');
const Computer = require('../../models/computer');

const perPage = 5;
// GET ALL
router.get('/:page', (req,res) => {
    const page = req.params.page;
    Promise.all([Camera.find(), TV.find(), Computer.find(), Phone.find()]).then(
    val => { 
        const products = val[0].concat(val[1], val[2], val[3]);
        const pages = Math.ceil(products.length/perPage);
        res.json({items: products.slice(perPage*page - perPage,perPage*page), pages: pages});
    }).catch(err => res.json({success: false}));
});

// GET 

router.get('/cameras/:page',(req, res)=>{
    
    const page = req.params.page;
    // Camera.find()
    //     .limit(perPage)
    //     .skip((perPage * page) -perPage)
    //     .sort()
    //     .then(camera => {
    //         res.json({items: camera})});
    Camera.paginate({}, {page: page, limit: perPage}).then(camera => res.json({items: camera.docs, pages: camera.pages}));
})
router.get('/tvs/:page',(req, res)=>{
    
    const page = req.params.page;
    TV.paginate({}, {page: page, limit: perPage}).then(tv => res.json({items: tv.docs, pages: tv.pages}));
})

router.get('/computers/:page',(req, res)=>{
    
    const page = req.params.page;
    Computer.paginate({}, {page: page, limit: perPage}).then(computer => res.json({items: computer.docs, pages: computer.pages}));
})
router.get('/phones/:page',(req, res)=>{
    
    const page = req.params.page;
    Phone.paginate({}, {page: page, limit: perPage}).then(phone => res.json({items: phone.docs, pages: phone.pages}));
})

module.exports = router;