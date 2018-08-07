const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const User = require('../../models/User');
const date = require('../../date');
var logger = require('../../winston');
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
  });
// DELETE USER
router.delete('/delete/:id', jwtMW, (req,res) => {
    const token = req.get('Authorization').split(' ')[1]
    const decoded = jwt.decode(token);
    if(decoded.type === 'admin'){
        User.findById(req.params.id)
            .then(user => {
                user.remove().then(() => res.json({success:true})).catch(err =>res.status(404).json({success: false}));
            });
    } else {
        res.json({success: false, message: "You are not admin!"});
    }
    });
// DELETE ALL - temporary method
    router.delete('/deleteAll', (req,res) =>{
        User.remove({}, () => res.json({suc: true}));
     });
 // GET ALL USERS
     router.get('/all', jwtMW, (req,res) => {
        const token = req.get('Authorization').split(' ')[1]
        const decoded = jwt.decode(token);
        if(decoded.type === 'admin')
            User.find().then(resp => res.json(resp) );
        else 
            res.json({success: false, message: "You are not admin!"});
     });
// ADD NEW USER
     router.post('/addUser', (req,res) => {
         let newUser = new User();
         newUser.login = req.body.login;
         newUser.firstName = req.body.firstName;
         newUser.lastName = req.body.lastName;
         newUser.setPassword(req.body.password);
         newUser.mail = req.body.mail;
         newUser.type = "user";

         newUser.save().then(resp =>{
            logger.log({
                level :'info',
                message: 'Register success',
                user: req.body.login,
                date: date.localDateString,
                time: date.localTimeString,
            }) 
            res.json(resp)
        }).catch(err => {
            logger.log({
                level :'error',
                message: 'Register failed',
                user: req.body.login,
                error: err,
                date: date.localDateString,
                time: date.localTimeString,
            }) 
        });
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
            if(req.body.type)
                user.type = req.body.type;
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
                    let token = jwt.sign({id:user._id, type: user.type }, 'keyboard cat 4 ever', {expiresIn: 129600});
                    logger.log({
                        level :'info',
                        message: 'Login success',
                        user: req.body.login,
                        date: date.localDateString,
                        time: date.localTimeString,
                    })
                    res.json({success: true, err: null, token, id:user._id, type: user.type});
                } else {
                    logger.log({
                        level :'error',
                        message: 'Login failed',
                        error: "password",
                        date: date.localDateString,
                        time: date.localTimeString,
                    })
                    res.status(401).json({success: false, token: null, err: "failed"});
                }
            }).catch(err => {
                console.log(err);
                logger.log({
                    level :'error',
                    message: 'Login failed',
                    date: date.localDateString,
                    time: date.localTimeString,
                })
                res.json({success: false, token: null, err:"failed"})
            });
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