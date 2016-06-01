var mongoose = require('mongoose');

//define Schema
var todoSchema = mongoose.Schema({
	text:String,
	code:Number,
	createDate:{
	    type:Date,
	    default:Date.now
	  }
}); 
module.exports = mongoose.model('Todo',todoSchema);