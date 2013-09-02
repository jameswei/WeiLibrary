var rrest = require('rrestjs');
var stools = require('../modules/stools')
var mongo = rrest.mongo;
var get_id = stools.get_id;
var mongo_err = function(err, release){
	console.log(err);
	return release();
};
bookdao={};

bookdao.retrievebook = function(bookid,res){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("books", function(err, col){
			if(err) return mongo_err(err, release);
			col.findOne({'id': bookid}, function(err, doc){
				if(err){ 
					release();
					res.sendjson({"suc":0,"fail":"查询失败"});
				}
				res.sendjson(doc);
			});
		});
	});
}

bookdao.updatebook =  function(bookid,book,res){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("books", function(err, col){
			if(err) return mongo_err(err, release);
			col.update({'id': bookid},{$set:book}, function(err, doc){
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

bookdao.deletebook = function(bookid,res){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("books", function(err, col){
			if(err) return release();
			col.remove({'id':bookid},function(err, r){
				if(err){
					release();
					restlog.error('删除失败，id为：'+id+'失败原因：'+err);
					res.sendjson({"suc":0,"fail":"删除书籍操作失败"});
				}
				res.sendjson({"suc":1});				
			});
		});
	});
	mongo(function(err, db, release){
		if(err) return;
		db.collection("users", function(err, col){
			if(err) return mongo_err(err, release);
			col.update({'id': userid},{$pull:{'books':bookid}}, function(err, doc){
				if(err){ 
					release();
					return mongo_err(err, release);	
				}
				res.sendjson(doc);
				release();
			});
		});
	});
	//更新owner的list
}

bookdao.retrieveall = function(res){
	mongo(function(err, db, release){
		if(err) return;
		db.collection("books", function(err, col){
			if(err) return mongo_err(err, release);
			col.find().toArray(function(err,items){
				res.sendjson(items);
			});
		});
	});
}

bookdao.updatestatus = function(userid,bookid,status,res){
	//更新书籍和用户
	mongo(function(err, db, release){
		if(err) return;
		db.collection("books", function(err, col){
			if(err) return mongo_err(err, release);
			var content=
			col.update({'id': bookid},{$set:{'occupant':(status? "" : userid),'status':status}}, function(err, doc){
				if(err){ 
					release();
					res.sendjson({"suc":0,"fail":"更新失败"});
				}
				res.sendjson({"suc":1});
			});

		});
	});
	if(!status){
		mongo(function(err, db, release){
			if(err) return;
			db.collection("users", function(err, col){
				if(err) return mongo_err(err, release);
				col.update({'id': userid},{$push:{"occupied":bookid}}, function(err, doc){
					if(err){ 
						release();
					}
				});
			});
		});
	} else {
		mongo(function(err, db, release){
			if(err) return;
			db.collection("users", function(err, col){
				if(err) return mongo_err(err, release);
				col.update({'id': userid},{$pull:{"occupied":bookid}}, function(err, doc){
					if(err){ 
						release();
					}
				});
			});
		});
	}
}

module.exports=bookdao;