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
        required: true,
        es_indexed: true,
    },
    description:{
        type: String,
        required: true,
        es_indexed: true,
    },
    value:{
        type: Number,
        required: true,
        es_indexed: true,
    },
    producer: {
        type: String,
        required: true,
        es_indexed: true,
    },
    type: {
        type: String,
        required: true,
        es_indexed: true,
    }
});

Computer.plugin(mongoosastic,{hosts:[host]});
Computer.plugin(mongoosePaginate);

module.exports = Item = mongoose.model('computer', Computer);
