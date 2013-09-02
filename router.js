//weijia @ 2013-6-7
var user = require('./controller/user');
var book = require('./controller/book');

module.exports = {

	"post:/user/login":user.login,

	"post:/user/logout":user.logout,

	"post:/user/register":user.register,

	"get:/user/all":user.all,

	"get:put:/user/info/{userid}":user.info,

	"get:post:/user/book/{userid}":user.book,

	"get:put:del:/book/info/{bookid}":book.info,

	"put:/book/status/{bookid}":book.status,

	"get:/book/all":book.all,
}