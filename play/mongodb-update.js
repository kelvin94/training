// const MongoClient = require('mongodb').MongoClient;
// using destructuring on the line above
const {MongoClient, ObjectID} = require('mongodb');

//fetch data

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('59455c0edb653b051e13dc9f')
    // }, {
    //     //mongodb update operators
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then( (res)=>{
    //     console.log(res);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5945b16cdb653b051e13ef2b')
    }, {
        $set: {
            name: 'jia ying Lin'
        },
        $inc: {
            age: 1
        }
    })
    //db.close();
});