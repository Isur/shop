const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const User = require('../../models/User');
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
  });
// DELETE USER
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
// UPDATE USER 
     router.post('/updateUser', (req,res) => {
        User.findById(req.body.id).then(user => {
            if(req.body.firstName)
                user.firstName = req.body.firstName;
            if(req.body.lastName)
                user.lastName = req.body.lastName;
            if(req.body.mail)
                user.mail = req.body.mail;
            if(req.body.password)
                user.setPassword(req.body.password);
            
            user.save().then(response => res.json(response));
        })
    })
// LOGIN
     router.post('/login', (req,res) => {
         User.findOne({login: req.body.login})
            .then(user => {
                if(user.validPassword(req.body.password)){
                    let token = jwt.sign({login:user.login, mail: user.mail }, 'keyboard cat 4 ever', {expiresIn: 129600});
                    res.json({success: true, err: null, token, id:user._id});
                } else {
                    res.status(401).json({success: false, token: null, err: "failed"});
                }
            }).catch(err => res.json({success: false, token: null, err:"failed"}));
     })

// IS LOGGED
     router.get('/logged', jwtMW, (req,res) => {
        res.json({logged: true});
     });

// FIND USER
     router.get('/user/:id', jwtMW, (req,res) => {
         User.findById(req.params.id).then(user => res.json(user));
     })
module.exports = router;