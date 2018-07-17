const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;


const TV = new Schema({
    name:{
        type: String,
        required: true,
        es_indexed: true
    },
    diagonal: {
        type: Number,
        required: true,
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
        required: true,
    },
    type: {
        type: String,
        required: true
    }
});

TV.plugin(mongoosastic,{hosts:["172.18.0.2:9200"]});
TV.plugin(mongoosePaginate);


module.exports = Item = mongoose.model('tv', TV);
