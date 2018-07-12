const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

const Computer = new Schema({
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

Computer.plugin(mongoosastic);

module.exports = Item = mongoose.model('computer', Computer);
