const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

const Phone = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    value:{
        type: Number,
        required: true
    },
    producer: {
        type: String,
        required: true
    }
});

Phone.plugin(mongoosastic);

module.exports = Item = mongoose.model('phone', Phone);
