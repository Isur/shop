const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
  });
const Item = require('../../models/Item');
const User = require('../../models/User');

// DELETE ITEM
router.delete('/delete/:id', (req,res) => {
    Item.findByIdAndRemove(req.params.id)
        .then(item => {
            item.remove().then(() => res.json({success:true})).catch(err =>res.status(404).json({success: false}));
        });
    });
// DELETE ALL - temporary method
    router.delete('/deleteAll', (req,res) =>{
        Item.remove({}, () => res.json({suc: true}));
     });

// ADD ITEM
router.post('/addItem', jwtMW, (req,res) => {
    User.findById(req.body.id).then(user => {
        if(user.permissions.addProducts !== true && user.type !== 'admin'){
            console.log('cant add');
            res.json({success: "You have no permission to do this.", code: 403});
        } else {
            console.log('add');
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
        }
    })
})

module.exports = router;