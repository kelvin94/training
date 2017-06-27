var mongoose = require('mongoose');

// Set up models
// Validation: go google mongoose validation
var Todo = mongoose.model('Todo', {
    //2nd argument is the properties of the model
    text: {
        type: String,//type: String有一个弊处： 如果data是数字123，或者true/false, 数字跟boolean 类型还是通过了validation
        required: true,
        minlength: 1,
        trim: true
    }, completed: {
            type: Boolean,
            default: false
    }, completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};

// //##################################################
// // Demonstration of creating an instance of model
// var newTodo = new Todo({
//     text: 'cook breakfast'
// });
// var newUser = new User({
// });

// newUser.save().then( (user)=>{
//     console.log(user);
// });

// // newTodo.save().then( (doc)=>{
// //     console.log(JSON.stringify(doc,undefined, 2));
// // }, (err)=>{
// //     console.log(err);
// // });
// //################################################