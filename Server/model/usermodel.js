const mongoose = require('../config/db'),Schema = mongoose.Schema;

const userDetail = new Schema({
        name:String,
        email:String,
        age:Number,
        prograd_id:Number,
        squad:Number
});

const User = mongoose.model('User',userDetail);

module.exports = {User};