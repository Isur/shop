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
        res.json(products.slice(perPage*page - perPage,perPage*page));
    }).catch(err => res.json({success: false}));
});

// GET 

router.get('/cameras/:page',(req, res)=>{
    
    const page = req.params.page;
    Camera.find()
        .limit(perPage)
        .skip((perPage * page) -perPage)
        .sort()
        .then(camera => res.json(camera));
})
router.get('/tvs/:page',(req, res)=>{
    
    const page = req.params.page;
    TV.find()
        .limit(perPage)
        .skip((perPage * page) -perPage)
        .sort()
        .then(tv => res.json(tv));
})

router.get('/computers/:page',(req, res)=>{
    
    const page = req.params.page;
    Computer.find()
        .limit(perPage)
        .skip((perPage * page) -perPage)
        .sort()
        .then(computer => res.json(computer));
})
router.get('/phones/:page',(req, res)=>{
    
    const page = req.params.page;
    Phone.find()
        .limit(perPage)
        .skip((perPage * page) -perPage)
        .sort()
        .then(phone => res.json(phone));
})

module.exports = router;