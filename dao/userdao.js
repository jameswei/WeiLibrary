var rrest = require('rrestjs');
var stools = require('../modules/stools2')
var mongo = rrest.mongo;
var get_id = stools.get_id;
var mongo_err = function(err, release){
	console.log(err);
	return release();
};
userdao={};

userdao.createuser = function(user,res){
	mongo(function(err, db, release){
		if(err) return;
		var id=get_id(db,new Date().getTime());
		//var id=(new Date().getTime()*2+''+new Date().getTime()).slice(0,24);
		user['id']=id;
		db.collection("users", function(err, col){
			if(err) return release();
			col.insert(user, function(err, record){
				if(err){
					release();
					console.error(err);
					//restlog.error('创建用户失败：'+err);
					res.sendjson({"suc":0, "fail":"创建用户失败"});
				}				
				res.sendjson({"suc":1,'id':id});
			});
		});
	});
}

userdao.createtoken = function(token){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("token", function(err, col){
			if(err) return release();
			col.insert(token, function(err, record){
				if(err){
					release();
					//restlog.error('创建token失败：'+err);
				}
			});
		});
	});
}
userdao.deletetoken = function(token,res){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("token", function(err, col){
			if(err) return release();
			col.findAndRemove({'token':token},function(err, r){
				if(err){
					release();
					//restlog.error('删除失败，token为：'+token+'失败原因：'+err);
					res.sendjson({"suc":0,"fail":"操作失败"});
				}
				res.sendjson({"suc":1});				
			});
		});
	});
}

userdao.retrievepassword = function(username,password,res){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("users", function(err, col){
			if(err) return mongo_err(err, release);
			col.findOne({'email': username}, function(err, doc){
				if(err){ 
					release();
					//return mongo_err(err, release);
					res.sendjson({"suc":0,"fail":"操作失败"});	
				}
				if(password===doc["password"]){
					userdao.createtoken({"username":doc['email'],"token":doc['id']+'',"timestamp":new Date().toString()});
					res.sendjson({"suc":1,"id":doc['id'],"data":doc});
				}
			});
		});
	});
}

userdao.retrieveuser = function(userid,res,callback){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("users", function(err, col){
			if(err) return mongo_err(err, release);
			col.findOne({'id': userid}, function(err, doc){
				if(err){ 
					release();
					//return mongo_err(err, release);
					res.sendjson({"suc":0,"fail":"查询失败"});
				}
				if(res==null && callback!=null){
					callback=doc;
				}else {
					res.sendjson(doc);
				}
			});
		});
	});
}

userdao.retrieveall = function(res){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("users", function(err, col){
			if(err) return mongo_err(err, release);
			col.find().toArray(function(err,items){
				if(err){
					release();
					//res.sendjson({"suc":0,"fail":"查询失败"});
					res.sendjson([]);
				}
				res.sendjson(items);
			});
		});
	});
}

userdao.updateuser =  function(userid,user,res){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("users", function(err, col){
			if(err) return mongo_err(err, release);
			col.update({'id': userid},{$set:user}, function(err, doc){
				if(err){ 
					release();
					//return mongo_err(err, release);
					res.sendjson({"suc":0,"fail":"更新失败"});
				}
				res.sendjson(doc);
			});
		});
	});
}

userdao.createbook = function(book,res){
	mongo(function(err, db, release){
		if(err) return;
		var id=get_id(db,new Date().getTime())
		book['id']=id;
		db.collection("books", function(err, col){
			if(err) return release();
			col.insert(book, function(err, record){
				if(err){
					release();
					//restlog.error('创建书籍：'+err);
					res.sendjson({"suc":0, "fail":"创建书籍失败"});
				}
				res.sendjson({"suc":1,"id":id,"newbook":record});
			});
		});
		db.collection("users", function(err, col){
			if(err) return mongo_err(err, release);
			col.update({'id': book['owner']},{$push:{"books":id}}, function(err, doc){
				if(err){ 
					release();
				}
			});
		});
	});
}

userdao.getbook =  function(userid,res){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("books", function(err, col){
			if(err) return mongo_err(err, release);
			// col.find({'owner': userid}, function(err, doc){
			// 	if(err){ 
			// 		release();
			// 		//return mongo_err(err, release);	
			// 		res.sendjson({"suc":0, "fail":"查询书籍失败"});
			// 	}
			// 	//res.sendjson(doc);
			// }).toArray(function(err,items){
			// 	res.sendjson(items);
			// });
			var cursor=col.find({'owner':userid});
			cursor.toArray(function(err,items){
				if(err){
					release();
					res.sendjson([]);
				}
				res.sendjson(items);
			})
		});
	});
}
module.exports = userdao;
