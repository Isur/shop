const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// DELETE ITEM
router.delete('/delete/:id', (req,res) => {
    User.findById(req.params.id)
        .then(user => {
            user.remove().then(() => res.json({success:true})).catch(err =>res.status(404).json({success: false}));
        });
    });
// DELETE ALL - temporary method
    router.delete('/deleteAll', (req,res) =>{
        User.remove({}, () => res.json({suc: true}));
     });
 // GET ALL USERS
     router.get('/all', (req,res) => {
        User.find().then(resp => res.json(resp) );
     });
// ADD NEW USER
     router.post('/addUser', (req,res) => {
         let newUser = new User();
         newUser.login = req.body.login;
         newUser.firstName = req.body.firstName;
         newUser.lastName = req.body.lastName;
         newUser.setPassword(req.body.password);
         newUser.mail = req.body.mail;

         newUser.save().then(resp => res.json(resp));
     });
    
module.exports = router;