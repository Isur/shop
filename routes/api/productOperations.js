const express = require('express');
const router = express.Router();

// Models
const Camera = require('../../models/camera');
const Computer = require('../../models/computer');
const Phone = require('../../models/phone');
const TV = require('../../models/tv');

router.post('/addCamera', (req,res)=>{
    const newItem = new Camera({
        name:           req.body.name,
        description:    req.body.description,
        value:          req.body.value,
        producer:       req.body.producer
    });
    newItem.save().then(camera => res.json(camera));
});

router.delete('/deleteCamera/:id', (req,res) => {
    Camera.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;