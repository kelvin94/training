var {User} = require('./../models/user');


// a middleware for routes, to make routes private
var authenticate = (req, res, next) => {
    //.header only gets the value in the argument of the method
    var token = req.header('x-auth');

    User.findByToken(token).then( (user) => {
        if(!user){//this IF statment is for 'token is valid but somehow we're not ablt to find the corresponding doc
            // res.status(401).send();
            return Promise.reject();//this line is automatically outputing the error to the catch block in 5 lines below

        }

        req.user = user;
        req.token = token;
        next();// next() must be called otherwise the whole app will stop

    }).catch((e)=>{
        res.status(401).send();// 401 === 'Unauthorized'
    });
};

module.exports = {
    authenticate
};

