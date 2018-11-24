var express = require('express');
var router = express.Router();
var userModel = require('../model/user.js');

router.post('/', function(req, res, next) {
  userModel.find({
  	phone:req.body.phone
  }).then((info)=>{
  	if(info.length === 0){
  		//用户名不存在
  		res.send({state:0});
  		return;
  	} else {
  		userModel.find({
  			phone:req.body.phone,
  			password:req.body.password
  		}).then((info)=>{
  			if(info.length === 1){	
  				//用户名密码正确 		
  				req.session.userInfo = info[0];
  				res.send({state:2})
  			}else{
  				//用户名密码不对
  				res.send({state:1});
  			}
  		})
  	}
  })
});

router.get('/',(req,res,next)=>{
  if(!req.session.userInfo){
    return;
  }
    userModel.findOne({_id:req.session.userInfo._id}).then((info)=>{
      // console.log(info)
      res.send({data:info});
    })
})
module.exports = router;