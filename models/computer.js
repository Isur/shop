const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

const Computer = new Schema({
    name:{
        type: String,
        required: true,
        es_indexed: true
    },
    RAM:{
        type: Number,
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

Computer.plugin(mongoosastic,{hosts:["172.18.0.2:9200"]});

module.exports = Item = mongoose.model('computer', Computer);
