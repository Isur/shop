const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;
const host = require('../config/keys').elastic;

const Computer = new Schema({
    name:{
        type: String,
        required: true,
        es_indexed: true
    },
    ram:{
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

Computer.plugin(mongoosastic,{hosts:[host]});
Computer.plugin(mongoosePaginate);

module.exports = Item = mongoose.model('computer', Computer);
