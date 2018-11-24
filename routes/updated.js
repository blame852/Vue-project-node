var express = require('express');
var router = express.Router();
var userModel = require('../model/user.js');
var multer  = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	   cb(null, 'public/uploads/');
	 },
	filename(req,file,cb){
	    const filenameArr = file.originalname.split('.');
	    cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
	  }
})
var upload = multer({storage: storage});

router.post('/photo',upload.array("resource"),(req,res,next)=>{
	var fileArray = [];
	req.files.forEach((item,i)=>{
		fileArray.push(item['filename']);
	})
	userModel.findByIdAndUpdate(req.session.userInfo._id,{
			userImg:JSON.stringify(fileArray)
	}).then((info)=>{})
	
});

module.exports = router;