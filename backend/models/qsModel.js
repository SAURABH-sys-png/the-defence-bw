const mongoose = require('mongoose');
const { options } = require('../routes/admin');

const qsSchems = new mongoose.Schema({
    question : {
        type:String,
        required: [true,'Enter the qs'],
    },
    option_a : {
        type : String,
        required : [true,'Enter the options'],
    },
});

module.exports = mongoose.model('QS',qsSchems);