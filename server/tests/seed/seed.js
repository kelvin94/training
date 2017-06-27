const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
//the array of user that we add as seed data
const users =[{
    _id: userOneId,
    email: 'kk@example.com',
    password: 'userOnePass',
    tokens: [{
        acess: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'jen@exam.com',
    password: 'userTwoPass'
}];


const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then( ()=>{
        return Todo.insertMany(todos);
    }).then( ()=>{
        done();
    });
};


const populateUsers = (done) =>{
    User.remove({}).then( ()=>{
        var userOne = new User(users[0]).save();//.save returns a promise
        var userTwo = new User(users[1]).save();


        //promise.all takes an array of promises 
        // promise.all ensures both userOne and userTwo are finished saving.
        return Promise.all([userOne, userTwo]);
        
    }).then( ()=> done());
};


module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};