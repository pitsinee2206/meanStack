//mongoose - nodejs connector to connect with mongoDb
var mongoose = require('mongoose');

//define student model
module.exports = mongoose.model('Students', {
    name : {type: String, default : ''}
});
