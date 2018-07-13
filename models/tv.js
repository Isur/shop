const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

const TV = new Schema({
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
    },
    type: {
        type: String,
        required: true
    }
});

TV.plugin(mongoosastic,{hosts:["172.17.0.2:9200"]});

module.exports = Item = mongoose.model('tv', TV);
