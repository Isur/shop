const express = require('express');
const router = express.Router();

// Models
const Camera = require('../../models/camera');
const TV = require('../../models/tv');
const Phone = require('../../models/phone');
const Computer = require('../../models/computer');

// GET ALL
router.get('/', (req,res) => {

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