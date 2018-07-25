const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;
const host = require('../config/keys').elastic;

const Item = new Schema({
    name:{
        type: String,
        required: true,
        es_indexed: true
    },
    description:{
        type: String,
        required: true,
        es_indexed: true,
    },
    longDescription:{
        type: String,
        required: true,
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
    itemType: {
        type: String,
        required: true,
        es_indexed: true,
    }
});

Item.plugin(mongoosastic,{hosts:[host]});
Item.plugin(mongoosePaginate);

module.exports = item = mongoose.model('item', Item);
