const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;
const host = require('../config/keys').elastic;

const TV = new Schema({
    name:{
        type: String,
        required: true,
        es_indexed: true
    },
    diagonal: {
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
    imageLink:{
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

TV.plugin(mongoosastic,{hosts:[host]});
TV.plugin(mongoosePaginate);


module.exports = Item = mongoose.model('tv', TV);
