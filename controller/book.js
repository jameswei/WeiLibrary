var bookDao = require('../dao/bookdao');
var userDao = require('../dao/userdao');

var book={}
book.all =  function(req,res){
	if(req.method==='GET'){
		bookdao.retrieveall(res);
	}
}

book.status = function(req,res){
	if(req.method==='PUT'){
		var bookid=req.pathname.split('/')[3];
		var status=req.apibody.status;
		var userid=req.apibody.userid;
		bookdao.updatestatus(userid,bookid,status,res);
	}
}

book.info = function(req, res){
	if(req.method==='GET'){
		//get book info from mongo
		var bookid=req.pathname.split('/')[3];
		bookdao.retrievebook(bookid,res);

	}else if(req.method==='PUT'){
		//update book info 
		
		var bookname=req.apibody.bookname || null;
		var description=req.apibody.description || null;
		var tags=req.apibody.tags || null;
		var bookid=req.pathname.split('/')[3];
		var book={};
		book.bookname=bookname;
		book.description=description;
		book.tags=tags;
		bookdao.updateuser(bookid,book,res);
	}else if(req.method==='DELETE'){
		//delete book from this user
		var bookid=req.pathname.split('/')[3];
		bookdao.deletebook(bookid,res);
	}
}

module.exports=book;