var express = require('express');
var router = express.Router();


router.get('/',(req,res,next)=>{
	// if(!req.session.userInfo){
	// 	// res.redirect('/login');
	// 	return;
	// }
	req.session.destroy(()=>{
		// res.redirect('/login');
	})
	res.send({state:0});
})

module.exports = router;