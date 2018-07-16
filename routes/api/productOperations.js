const express = require('express');
const router = express.Router();

const Camera = require('../../models/camera');
const Computer = require('../../models/computer');
const Phone = require('../../models/phone');
const TV = require('../../models/tv');

// ADD ITEMS
router.post('/addCamera', (req,res)=>{
    const newItem = new Camera({
        name:           req.body.name,
        resolution:     req.body.resolution,
        description:    req.body.description,
        value:          req.body.value,
        producer:       req.body.producer,
        type:           req.body.type
    });
    newItem.save().then(camera => res.json(camera));
});

router.post('/addTV', (req,res)=>{
    const newItem = new TV({
        name:           req.body.name,
        diagonal:       req.body.diagonal,
        description:    req.body.description,
        value:          req.body.value,
        producer:       req.body.producer,
        type:           req.body.type
    });
    newItem.save().then(tv => res.json(tv));
});

router.post('/addPhone', (req,res)=>{
    const newItem = new Phone({
        name:           req.body.name,
        ROM:            req.body.rom,
        description:    req.body.description,
        value:          req.body.value,
        producer:       req.body.producer,
        type:           req.body.type
    });
    newItem.save().then(phone => res.json(phone));
});

router.post('/addComputer', (req,res)=>{
    const newItem = new Computer({
        name:           req.body.name,
        RAM:            req.body.ram,
        description:    req.body.description,
        value:          req.body.value,
        producer:       req.body.producer,
        type:           req.body.type
    });
    newItem.save().then(computer => res.json(computer));
});

// DELETE ITEMS

router.delete('/delete/:id', (req,res) => {
    Promise.all([Camera.findById(req.params.id), Computer.findById(req.params.id), TV.findById(req.params.id), Phone.findById(req.params.id)])
        .then(item => {
            for(i=0;i<4;i++){
                if(item[i] !== null)
                    item[i].remove().then(() => res.json({success:true})).catch(err =>res.status(404).json({success: false}));
            }
        });
});

module.exports = router;