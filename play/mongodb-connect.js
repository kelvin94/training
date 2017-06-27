// const MongoClient = require('mongodb').MongoClient;
// using destructuring on the line above
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB');

    // db.collection('Todos').insertOne( ({
    //     text: 'sth to do',
    //     completed: false
    // }), (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert Todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne( ({
        name: 'jyl',
        age: 33

    }), (err, result) => {
        if(err) {
            return console.log('Unable to insert User', err);
        }
        //result.ops会return我们刚刚insert得东西which is the ONE doc that we inserted
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    });
    db.close();
});