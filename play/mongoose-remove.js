const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

// remove everything
// Todo.remove({}).then( (res) => {
//     console.log(res);
// });

//find one, return that one then remove
Todo.findOneAndRemove()

//find one, return that one then remove
Todo.findByIdAndRemove('59482eece8922bf72acb9574').then( (doc) => {
    console.log(doc);
});


