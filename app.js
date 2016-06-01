var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

var db = require('./db');
mongoose.connect(db.url);

var Todo = require('./models/todos');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride());
app.use(express.static(__dirname+'/public'));

//routes ======================================================================

app.get('/',function(req,res){
	//res.end('<a href="/todos">Get all Todos</a>');
	res.sendFile('./public/index.html');
});
// api ----------
app.get('/todos',function(req,res){
	//use mongoose to get all the data in database
	Todo.find(function(err,todos){
		
		//if there is an error send the error, nothing will be executed after res.send(err)
		if(err)
			res.send(err);
		
		res.json(todos);//return all the todos in json format
	});
});

//create todo
app.post('/create_todo',function(req,res){
	Todo.create({
		text:req.body.text,
		code:req.body.code,
		done:false
	},function(err,todo){
		if(err)
			res.send(err);
		
		//res.redirect('/todos');
		Todo.find(function(err,todos){
			if(err)
				res.send(err)
				
				res.json(todos);
		});
	});
});

//delete a todo
app.delete('/delete/:todo_id',function(req,res){
	Todo.remove({
		_id:req.params.todo_id
	},function(err,todo){
		if(err)
			res.send(err);
		
		//res.redirect('/todos');
		Todo.find(function(err,todos){
			if(err)
				res.send(err)
				
				res.json(todos);
		});
	});
});

//where less than
app.post('/less_than',function(req,res){
	Todo.find({'code':{$lt:req.body.code}},function(err,todos){
		if(err)
			res.send(err);
		
		res.json(todos);
	});
});

//where greater than
app.post('/greater_than',function(req,res){
	Todo.find({'code':{$gt:req.body.code}},function(err,todos){
		if(err)
			res.status(404).send(err);
		
		res.json(todos);
	});
});

//and
app.post('/and',function(req,res){
	Todo.find({'text':req.body.text,'code':'3'},function(err,todos){
		if(err)
			res.send(err);
		
		res.json(todos);
	});
});

//listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");