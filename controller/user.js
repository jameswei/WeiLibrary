var userdao =  require('../dao/userdao');

var user = {}

user.login = function(req, res){
	if(req.pathname==='/user/login'){
		var username=req.apibody.username;
		var password=req.apibody.password;
		userdao.retrievepassword(username,password,res);
	}	
}

user.logout = function(req, res){
	if(req.pathname==='/user/logout'){
		var token=req.apibody.token;
		userdao.deletetoken(token,res);
	}
	
}
//{"suc":1,"id":"274123525608413706176280"}
user.register = function(req, res){
	console.log("invoke");
	if(req.pathname==='/user/register'){
		var username=req.apibody.username;
		var password=req.apibody.password;
		var email=req.apibody.email || null;
		//var gender=req.apibody.email;
		//var avatarid=req.apibody.avatarid || (gender==='M'? 1:0);
		var bio=req.apibody.bio || null;
		var tags=req.apibody.tags || null;
		//register
		var user={};
		user.username=username;
		user.password=password;
		user.email=email;
		user.bio=bio;
		user.tags=tags;
		user.books=[];
		user.occupied=[];
		userdao.createuser(user,res);
		//res.send('/user/register');
	}
	
}

user.all =  function(req,res){
	if(req.method==='GET'){
		userdao.retrieveall(res);
	}
}

user.info = function(req, res){
	if(req.method==='GET'){
		var userid=req.pathname.split('/')[3];
		userdao.retrieveuser(userid,res)
	}else if(req.method==='PUT'){
		//var email=req.apibody.email || null;
		//var avatarid=req.apibody.avatarid || 1;
		var bio=req.apibody.bio || null;
		var tags=req.apibody.tags.split(';') || null;
		var userid=req.pathname.split('/')[3];
		var user={};
		user.bio=bio;
		user.tags=tags;
		userdao.updateuser(userid,user,res);
	}
}

user.book = function(req, res){
	if(req.method==='GET'){
		var userid=req.pathname.split('/')[3];
		userdao.getbook(userid,res);

	}else if(req.method==='POST'){
		//add book for this user into mongo
		var userid=req.pathname.split('/')[3];
		var bookname=req.apibody.bookname || null;
		var status=true;
		var description=req.apibody.description || null;
		var tags=req.apibody.tags || null;
		var book={};
		book.owner=userid;
		book.occupant='';
		book.bookname=bookname;
		book.status=status;
		book.description=description;
		book.tags=tags;
		userdao.createbook(book,res);
	}
}
module.exports = user;