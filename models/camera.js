const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;
const host = require('../config/keys').elastic;

const Camera = new Schema({
    name:{
        type: String,
        required: true,
        es_indexed: true,
    },
    resolution:{
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

Camera.plugin(mongoosastic,{hosts:[host]});
Camera.plugin(mongoosePaginate);

module.exports = Item = mongoose.model('camera', Camera);
