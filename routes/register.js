var express = require('express');
var router = express.Router();
var userModel = require('../model/user.js');


router.post('/',(req,res,next)=>{
	// console.log(111)
	userModel.create({
		phone:req.body.phone,
		username:req.body.username,
		password:req.body.password
	}).then((info)=>{
		res.send({state:2})
	})
})

router.post('/check',(req,res,next)=>{
	userModel.find({phone:req.body.phone}).then((info)=>{
		console.log(info.length)
		if(info.length === 1){
			// 电话存在
			res.send({state:0});
		} else {
			//电话不存在
			res.send({state:1});
		}
	})
})

module.exports = router;