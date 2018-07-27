const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const User = require('../../models/User');
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
  });
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
// LOGIN
     router.post('/login', (req,res) => {
         User.findOne({login: req.body.login})
            .then(user => {
                if(user.validPassword(req.body.password)){
                    let token = jwt.sign({login:user.login, mail: user.mail }, 'keyboard cat 4 ever', {expiresIn: 129600});
                    res.json({success: true, err: null, token});
                } else {
                    res.status(401).json({success: false, token: null, err: "failed"});
                }
            }).catch(err => res.json({success: false, token: null, err:"failed"}));
     })

// IS LOGGED
     router.get('/logged', jwtMW, (req,res) => {
        res.json({logged: true});
     });
module.exports = router;