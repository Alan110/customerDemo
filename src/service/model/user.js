var mongoose = require('mongoose');

//新建数据字典对象
var userSchema = mongoose.Schema({
    name: String,
});

//绑定到数据库文档,返回odm对象
var user = mongoose.model('user', userSchema)

module.exports = user;
