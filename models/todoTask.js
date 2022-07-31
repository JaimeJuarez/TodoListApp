var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    id: Number,
    title: String,
    completed: Boolean,
})

var todoTask = mongoose.model('task', todoSchema)

module.exports = todoTask;