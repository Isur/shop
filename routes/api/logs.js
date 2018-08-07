const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const fs = require('fs');
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
  });


  router.get('/error', jwtMW, (req,res) => {
    const token = req.get('Authorization').split(' ')[1]
    const decoded = jwt.decode(token);
    console.log(decoded);
    if(decoded.type === 'admin'){
        var contents = fs.readFileSync('logs/error.log', 'utf8');
        res.json(contents);
    }
    else 
        res.json({success: false, message: "You are not admin!"});
  })

  router.get('/combined', jwtMW, (req,res) => {
    const token = req.get('Authorization').split(' ')[1]
    const decoded = jwt.decode(token);
    if(decoded.type === 'admin'){
        var contents = fs.readFileSync('logs/combined.log', 'utf8');
        console.log(contents);
        res.json(contents);
    }
    else 
        res.json({success: false, message: "You are not admin!"});
  })

  module.exports = router;