var express = require('express');
var router = express.Router();
var proModel = require('../model/product.js');

router.post('/',(req,res,next)=>{
	proModel.find({productId:req.body.shopTitle.productId}).then((infos)=>{
		if(infos.length === 1){
			res.send({state:'数据库中已存在'});
			// console.log(1111)
			return;
		} else{
			// console.log(2222)
			var index = req.body.shopTitle.productTitle.indexOf(' ');
			var style = req.body.shopTitle.productTitle.slice(index);
			proModel.create({
				proImg:req.body.shopTitle.productImg,
				proName:req.body.shopTitle.productTitle,
				proStyle:style,
				proPrice:req.body.shopTitle.originalPrice,
				proDesc:req.body.shopInformation,
				productId:req.body.shopTitle.productId
			}).then((info)=>{
				res.send({state:'添加数据库成功'});
			})
		}
	})
});

module.exports = router;