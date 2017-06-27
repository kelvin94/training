const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var id = '5947100249fbd63ec4534142';
if(!ObjectID.isValid(id)){
    console.log('ID not valid');
}
//find() returns array
Todo.find({
    _id: id
}).then( (todos) => {
    console.log(todos);
});

//findOne returns single object
Todo.findOne({
    _id: id
}).then( (todo) => {
    console.log(todo);
});

Todo.findById({
    _id: id
}).then( (todo) => {
    console.log(todo);
});


