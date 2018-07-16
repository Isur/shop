const express = require('express');
const router = express.Router();

// Models
const Camera = require('../../models/camera');
const TV = require('../../models/tv');
const Phone = require('../../models/phone');
const Computer = require('../../models/computer');

// GET ALL
router.get('/', (req,res) => {
    Promise.all([Camera.find(), TV.find(), Computer.find(), Phone.find()]).then(
    val => { 
        console.log(val);
        const products = val[0].concat(val[1], val[2], val[3]);
        res.json(products); 
    }).catch(err => res.json({success: false}));
});

// GET 

router.get('/cameras/',(req, res)=>{
    Camera.find()
        .sort()
        .then(camera => res.json(camera));
})
router.get('/tvs/',(req, res)=>{
    TV.find()
        .sort()
        .then(tv => res.json(tv));
})

router.get('/computers/',(req, res)=>{
    Computer.find()
        .sort()
        .then(computer => res.json(computer));
})
router.get('/phones/',(req, res)=>{
    Phone.find()
        .sort()
        .then(phone => res.json(phone));
})

module.exports = router;