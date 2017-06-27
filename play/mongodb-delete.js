// const MongoClient = require('mongodb').MongoClient;
// using destructuring on the line above
const {MongoClient, ObjectID} = require('mongodb');

//fetch data

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'sth to do'}).then( (result)=>{
    //     console.log(result);
    // }, (err)=>{
    //     console.log('Unable to deleteMany',err);
    // });
    // deleteOne
    // db.collection('Todos').deleteOne({text: 'lunch'}).then( (result)=>{
    //     console.log(result);
    // }, (err)=>{
    //     console.log(err);
    // });


    // db.collection('Todos').findOneAndDelete({text: 'lunch'}).then( (res)=>{
    //     console.log(res);
    // });

    //db.collection('Users').deleteMany({name: 'jyl'});
    db.collection('Users').findOneAndDelete({name: 'kelvin'}).then( (res)=>{
        console.log(res);
    });
    //db.close();
});