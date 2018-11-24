var express = require('express');
var router = express.Router();
var proModel = require('../model/product.js');
var userModel = require('../model/user.js');

router.get('/',(req,res,next)=>{
	// res.send({state:1})
	// res.render('index', {title: 'cart'})
	if(!req.session.userInfo){
		return;
	}
	userModel.findOne({_id:req.session.userInfo._id}).then((info)=>{
		var array = [];
		var cartArray = [];
		var countArray = [];
		info.userCart.sort((item1,item2)=>item1.productId-item2.productId);
		// console.log(info.userCart)
		info.userCart.forEach((item,index)=>{
			array.push(item.productId);
			countArray.push(item.count);
			// console.log(countArray)
		})
		proModel.find({productId:{$in:array}}).then((infos)=>{
			infos.sort((item1,item2)=>item1.productId-item2.productId)
			// console.log(infos);	
			res.send({data:{
				information:infos,
				count:countArray
			}})
		})		
	})
});

router.post('/add',(req,res,next)=>{
	if(!req.session.userInfo){
		return;
	}
	//添加购物车
	var product = {productId:req.body.id,count:req.body.number};
	console.log(product)
	userModel.findOne({_id:req.session.userInfo._id}).then((infos)=>{
		var array = infos.userCart;
		for(var i =0;i<array.length;i++){
			if(infos.userCart[i].productId === req.body.id){
				// 数量增加
				var count = infos.userCart[i].count;
				array[i].count = count + req.body.number;
				userModel.update({_id:req.session.userInfo._id},{$set:{userCart:array}}).then((info)=>{	
					res.send({jj:true});
					console.log('商品数量增加成功' );
				});
				return;
			}
		} 
				//添加新的商品	
		array.push(product);
		userModel.update({_id:req.session.userInfo._id},{$set:{userCart:array}}).then((info)=>{
			res.send({jj:true});
			console.log('购物车添加成功' );
		});
	})
})

//增加购物车
router.post('/cad',(req,res,next)=>{
	console.log(req.body.id)
	userModel.findOne({_id:req.session.userInfo._id}).then((infos)=>{
		var array = infos.userCart;
		array.forEach((item,index)=>{
			if(item.productId == req.body.id){
				item.count = item.count + 1;
				console.log(item.count)
			}
		})
		// console.log(array)
		userModel.update({_id:req.session.userInfo._id},{userCart:array}).then((info)=>{
			res.send({state:1});
			console.log('商品数量添加成功');
		})
	})
})

//减少购物车
router.post('/cre',(req,res,next)=>{
	console.log(req.body.id)
	userModel.findOne({_id:req.session.userInfo._id}).then((infos)=>{
		var array = infos.userCart;
		array.forEach((item,index)=>{
			if(item.productId == req.body.id){
				item.count = item.count - 1;
				console.log(item.count)
			}
		})
		// console.log(array)
		userModel.update({_id:req.session.userInfo._id},{userCart:array}).then((info)=>{
			res.send({state:1});
			console.log('商品数量减少成功');
		})
	})
})

//直接修改商品数量
router.post('/change',(req,res,next)=>{
	userModel.findOne({_id:req.session.userInfo._id}).then((infos)=>{
		var array = infos.userCart;
		array.forEach((item,index)=>{
			if(item.productId == req.body.id){
				item.count = req.body.count;
				console.log(item.count)
			}
		})
		// console.log(array)
		userModel.update({_id:req.session.userInfo._id},{userCart:array}).then((info)=>{
			res.send({state:1});
			console.log('商品数量修改成功');
		})
	})
})

router.post('/delete',(req,res,next)=>{
	console.log(req.body.id);
	userModel.findOne({_id:req.session.userInfo._id}).then((info)=>{
		var array = info.userCart;
		req.body.id.forEach((item,index)=>{
			var index = array.indexOf(item);
			array.splice(index,1);
		})
		userModel.update({_id:req.session.userInfo._id},{$set:{userCart:array}}).then((infos)=>{
			res.send({state:1});
			console.log('商品删除成功');
		})
	})
})
module.exports = router;
