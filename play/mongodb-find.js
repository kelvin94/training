// const MongoClient = require('mongodb').MongoClient;
// using destructuring on the line above
const {MongoClient, ObjectID} = require('mongodb');

//fetch data

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB');

    // db.collection('Todos').find().count().then( (count)=>{
    //     console.log(`Todos count: ${count}`);
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err);
    // });
    
    db.collection('Users').find({name: 'jyl'}).toArray().then( (users) =>{
        console.log(users);
    }, (err)=>{
        console.log('Unable to find this users ', err);
    });
    db.close();
});