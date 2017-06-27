// Set up models
// Validation: go google mongoose validation
var mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const _ =require('lodash');
const bcrypt = require('bcryptjs');




////##########下面这种define schema的方式不能让我们创造custom Model method: FindByToken
// var User = mongoose.model('User', {
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 1,
//         unique: true,
//         validate: {
//             validator: (value) => {
//                 return validator.isEmail(value);
//             }, // 这个custom fct跟“validator.isEmail"一摸一样
//             message: `{VALUE} is not a valid email`
//         }
//     },
//     password: {
//         type: String,
//         require: true,
//         minlength: 6
//     },
//     tokens: [{
//         access: {
//             type: String,
//             required: true
            
//         },
//         token: {//toekn是array因为我们会有different token for diff purposes
//             type: String,
//             required: true
    
//         }
//     }]
// });


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            }, // 这个custom fct跟“validator.isEmail"一摸一样
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
            
        },
        token: {//toekn是array因为我们会有different token for diff purposes
            type: String,
            required: true
    
        }
    }]
});

//Arrow Fuction doesn't bind THIS keyword

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString(); // .sign( payload, secret value)
    user.tokens.push({access, token});

    return user.save().then( () => {
        console.log(token);
        return token;
        //The double return lets us keep the chain alive. This means that the promise chain gets returned (from the first one). The inner return makes sure that the next then is able to get the token
    });

};

UserSchema.methods.toJSON = function() {
    //overriding toJson method: toJSON method is used when a mongoose models turns into JSON value
    var user = this;
    var userObject = user.toObject(); //.toObject converts mongoose variable, in this case: user,  convert it into regular obj with only properties available in document exist.
    return _.pick(userObject, ['_id','email']);

};


//###########statics are the methods defined on the Model. methods are defined on the document (instance).#########
UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;

    // 因为jwt.verify可以return error，所以我们不能直接 var decoded = jwt.verify因为这样子的话我们就不能拿到error。解决方法使用try block
    try{    
        decoded = jwt.verify(token, 'abc123');//jwt.verify parameters:( token, secret)
    } catch(e){
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();//这一行跟上三行一样
    }


    return User.findOne({
        _id: decoded._id,

        //access nested document using ''
        'tokens.token': token,
        'tokens.access': 'auth'
    });

}



// mongoose middleware: middleware that lets us run b4 or after certain event
UserSchema.pre('save', function(next){// next is a MUST-HAVE argument so that we can let mongoose know when the app proceed to the next step
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }

});// before the save event, we want to do sth









var User = mongoose.model('User', UserSchema);


module.exports = {User};