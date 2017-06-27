const {SHA256} = require('crypto-js');

//access hashing function
// var message = 'I am user number 3';
// var hash = SHA256(message).toString(); // hashing is a one way algorithm
// console.log('Message: ', message);
// console.log('Hash: ', hash);

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret').toString()
// }
////###如果按照上面这种方法来hash data, 黑客可以直接读取data然后自己用一趟hash function来得到一样的hash value so that it matches the one that programmer uses.因为这个case可以发生，所以才加入了salting也就是再hash value后面再加一串string

// const jwt = require('jsonwebtoken');

// // jwt.sign: takes the data, creates the hash for the data(signs the data obj), and return the token value
// // jwt.verify: takes the token and the secret to verify the data is secured.
// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc'); //this is the token we send back to user when they need to log in or sign up
// console.log(token);
// var decoded = jwt.verify(token,'123abc');
// console.log('decoded ',decoded);

const bcrypt = require('bcryptjs');
var password = '123abc!';
//generate a salt
// bcrypt.genSalt(10, (err, salt)=>{
//     // salt is built-in
//     bcrypt.hash(password, salt, (err, hash)=>{
//         //we want to store the hash not the actual password
//         console.log(hash);
//     });
//});//// 1st argument: number of rounds(longer to prevent brute force attack); 2nd arg: callback function

var hashedPassword = '$2a$10$z9X1zjfizbMNe2ao5gA.SuicDOT47IN8DNjerWqZsn1WQEq.60n1O';

bcrypt.compare('123', hashedPassword, (err, res)=>{
    //res is either true or false
    console.log(res);
});//bcrypt.compare() takes 2 value: the hashed password and the hashed password that we have stored in DB
