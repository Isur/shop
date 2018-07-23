const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

// DELETE ITEM
router.delete('/delete/:id', (req,res) => {
    Item.findById(req.params.id)
        .then(item => {
            item[i].remove().then(() => res.json({success:true})).catch(err =>res.status(404).json({success: false}));
        });
    });
// DELETE ALL - temporary method
    router.delete('/deleteAll', (req,res) =>{
        Item.remove({}, () => res.json({suc: true}));
     });

module.exports = router;