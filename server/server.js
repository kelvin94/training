require('./config/config.js');



const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
//body-parser extract the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with .

var {mongoose} = require('./db/mongoose');
var {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT;
app.use(bodyParser.json());//bodyParser.json() : Parses the text as JSON and exposes the resulting object on req.body.


app.post('/todos',(req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then( (doc)=>{
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
}); 


// GET all todos
app.get('/todos', (req, res)=>{
    Todo.find().then( (todos) => {
        res.send({todos});
    }, (err)=> {
        res.status(400).send(err);
    });
});


// GET a specific todo, /todos/:id
app.get('/todos/:id', (req, res) => {
    //res.send(req.params);
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
            return res.status(404).send('Todo ID is invalid');
        }
    Todo.findById(id).then( (todo) => {
        if(!todo){
            return res.status(404).send('todo not found');
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id
    if(!ObjectID.isValid(id)){
        return res.status(404).send('ID not valid');
    }
    Todo.findByIdAndRemove(id).then( (todo) => {
        if(!todo){
            return res.status(404).send('todo not found');
        }
        res.status(200).send({todo});
    }, (err) => {
        res.status(400).send(err);
    });
});









//PATCH /todos/:id
app.patch('/todos/:id', (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send('ID not valid');
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set:  body },{new: true}).then( (todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        return res.send({todo});
    }).catch( (e)=>{
        res.status(400).send();
    });

});



// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    
    // create a new user instance
    var user = new User(body);

    // generateAuthToken responsible for adding a token on individual user doc, saving that and return token then we can send it back to the user.
    //save the user instance

    user.save().then( () => {
        return user.generateAuthToken();
        // res.send(user);
    }).then( (token) => {
        res.header('x-auth',token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
    
});

// // a middleware for routes, to make routes private
// var authenticate = (req, res, next) => {
//     //.header only gets the value in the argument of the method
//     var token = req.header('x-auth');

//     User.findByToken(token).then( (user) => {
//         if(!user){//this IF statment is for 'token is valid but somehow we're not ablt to find the corresponding doc
//             // res.status(401).send();
//             return Promise.reject();//this line is automatically outputing the error to the catch block in 5 lines below

//         }

//         req.user = user;
//         req.token = token;
//         next();// next() must be called otherwise the whole app will stop

//     }).catch((e)=>{
//         res.status(401).send();// 401 === 'Unauthorized'
//     });
// };


//require auth(which means need to require valid x-auth token), then server finds the associate user and send the user back
app.get('/users/me', authenticate , (req, res)=>{
    res.send(req.user);
});



// POST /users/login {email, password}
// log in existed user
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    res.send(body);
});














app.listen(port, () => {
    console.log('Started on 3000...');
});

module.exports = {
    app
};
