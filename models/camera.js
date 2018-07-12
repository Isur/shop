const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

const Camera = new Schema({
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

Camera.plugin(mongoosastic,{hosts:["172.17.0.2:9200"]});

module.exports = Item = mongoose.model('camera', Camera);
