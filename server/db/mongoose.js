var mongoose = require('mongoose');

//##### Configuration of MongoDB
// mongoose supports callbacks by default, but Promies can be added
// here we load promises to mongoose.
mongoose.Promise = global.Promise;

//same as MongodbClient.connect, 27017/TodoApp, TodoApp是DB的名字
mongoose.connect(process.env.MONGODB_URI);
//用mongoose有一个好处是：当用了connect method连接去一个db的时候， 下面的代码按照逻辑上来说是马上就执行的（假设下一行代码是mongoose.save())。 但是mongoose会阻止一切跟db的互动直至db connection完成了。
//#########




module.exports = {mongoose};