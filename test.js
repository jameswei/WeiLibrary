var str='{"username":"weijia7","password":"weijia7"}'
//str='{"username":"weijia7","password":"weijia7","email":"weijia7@staff.sina.com","bio":"it屌丝","tags":"java；分布式；后端；"}'
//str='{"username":"wenhong1","password":"wenhong1","email":"wenhong1@staff.sina.com","bio":"it女屌丝","tags":"java；缓存；"}'
//str='{"username":"wangzhe8","password":"wangzhe8","email":"wangzhe8@staff.sina.com","bio":"it大牛","tags":"java；分布式；"}'
//str='{"token":"274296412258613714820612"}'
//str='{"bookname":"备胎的修养","description":"告诉你如何做备胎，屌丝必读！","tags":"屌丝；备胎；转正;"}'
//str='{"bookname":"Scala变成","description":"Scala头牌！it屌丝必读！","tags":"scala；动态语言；JVM；"}'
//str='{"bookname":"美容宝典","description":"it女屌丝美容宝典！","tags":"女屌丝；护肤;"}'
//str='{"bookname":"OSGi原理及实践","description":"OSGi权威指南","tags":"JAVA；OSGi；模块化"}'
//str='{"username":"wenhong1","password":"wenhong1","email":"wenhong1@staff.sina.com","bio":"it女","tags":"java；"}'
//str='{"username":"weijia7","password":"weijia7","email":"weijia7@staff.sina.com","bio":"it屌丝","tags":"后端；分布式；屌丝"}'
str='{"username":"fulin","password":"fulin","email":"fulin@staff.sina.com","bio":"it大牛，技术管理者","tags":"java；分布式；团队建设；"}'
str='{"username":"weihua2","password":"weihua2","email":"weihua2@staff.sina.com","bio":"it大牛，技术管理者","tags":"围脖平台；团队建设；p2p；"}'
str='{"bookname":"TCP-IP详解","description":"TCP-IP经典收藏！","tags":"TCP-IP；Network；"}'
str='{"bookname":"Think in Java","description":"Java必读！","tags":"Java；Think-in系列；大砖头；"}'
str='{"bookname":"Core Pattern of J2EE","description":"J2EE核心模式！","tags":"Java；Design Pattern；"}'
//str='274123496625613706174831'
var arr=[];
arr.push('test');
console.log(arr);
var len=Buffer.byteLength(str);

console.log(len);
// module.exports.rrestconfig = {
// 	listenPort:3000,
// 	//mongodb 配置
// 	isMongodb:true, //是否开启mongodb支持，注意：如果使用数据库存储session，这里必须开启
// 	MongodbIp:'127.0.0.1', //mongodb地址
// 	MongodbRC:false,//如果是false表示不使用mongodb的副本集，否则为字符串，表示副本集的名称
// 	MongodbRChost:[],//表示mongodb副本集的ip:port数组。
// 	MongodbPort:27017, //mongodb端口
// 	MongodbConnectString:false, //是否使用字符串连接，日入nae的连接方法，这个优先级高于地址+端口
// 	MongodbConnectTimeout:1000*30,//连接超时
// 	MongodbMaxConnect:50,//连接池连接数
// 	MongodbDefaultDbName:'rrest',//默认使用的数据库名
// 	poolLogger:false,//是否记录连接池的日志，建议关闭
// 	}
// var rrest = require('rrestjs');
// var stools = require('./modules/stools2')
// var mongo = rrest.mongo;
// var get_id = stools.get_id;
// mongo(function(err, db, release){
// 		if(err) return;
// 		console.log((new Date().getTime()*2+''+new Date().getTime()).slice(0,24));
// 		var id=get_id(db,'123456789012123456789012')
// 		console.log(id);		
// 	});
