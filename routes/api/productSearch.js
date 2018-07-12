const express = require('express');
const router = express.Router();

// Models
const Camera = require('../../models/camera');
// Get all
router.get('/all', (req,res) => {
    Camera.find()
        .sort()
        .then(camera => res.json(camera));
});

module.exports = router;