const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;


const Phone = new Schema({
    name:{
        type: String,
        required: true,
        es_indexed: true
    },
    rom:{
        type: Number,
        requiered: true,
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

Phone.plugin(mongoosastic,{hosts:["172.18.0.2:9200"]});
Phone.plugin(mongoosePaginate);

module.exports = Item = mongoose.model('phone', Phone);
