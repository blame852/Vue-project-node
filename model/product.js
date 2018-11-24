var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	proImg:String,
	proName:String,
	proStyle:String,
	proPrice:Number,
	proDesc:Array,
	productId:String
});

var productModel = mongoose.model('product',productSchema,'product');

module.exports = productModel;
