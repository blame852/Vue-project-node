var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	phone:String,
	username:String,
	password:String,
	userImg:String,
	userAutograph:String,
	userGender:String,
	userAge:String,
	userConstellation:String,
	userOccupation:String,
	userCart:{
		type : Array,
		default :[]
	}
});

var userModel = mongoose.model('user',userSchema,'user');

module.exports = userModel;

