const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

// DELETE ITEM
router.delete('/delete/:id', (req,res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.remove().then(() => res.json({success:true})).catch(err =>res.status(404).json({success: false}));
        });
    });
// DELETE ALL - temporary method
    router.delete('/deleteAll', (req,res) =>{
        Item.remove({}, () => res.json({suc: true}));
     });

// ADD ITEM
router.post('/addItem', (req,res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        longDescription: req.body.longDescription,
        value: req.body.value,
        producer: req.body.producer,
        imageLink: req.body.imageLink,
        itemType: req.body.itemType
    });
    newItem.save().then(resp => res.json(resp));
})

module.exports = router;