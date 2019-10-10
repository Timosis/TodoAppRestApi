const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoneSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now()
    },
    _id: mongoose.Schema.Types.ObjectId
});
module.exports = mongoose.model('Done',DoneSchema);