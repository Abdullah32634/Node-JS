const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const exSession = require('express-session');
const cookieParser 	= require('cookie-parser');
const dbConnection = require('./database');

const app = express();


app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}));

app.use(bodyParser.urlencoded({extended: false}));



const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('login-register');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}


app.post('/register', ifLoggedin, 

[
   
    body('user_name','name is Empty!').trim().not().isEmpty(),
	 body('user_contact','contact no is Empty!').trim().not().isEmpty(),
    body('user_username','Username is Empty!').trim().not().isEmpty(),
    body('user_pass','The password must be of minimum length 5 characters').trim().isLength({ min: 5 }),
],
(req,res,next) => {

    const validation_result = validationResult(req);
    const {user_name,user_contact, user_username, user_pass} = req.body;
    if(validation_result.isEmpty()){
        {
            dbConnection.execute("INSERT INTO 'reg'('name','contact','username','password') VALUES(?,?,?)",[user_name,user_contact,user_username, hash_pass])
            .then(result => {
                res.send('your account created successfully');
            })
        }
 
});



app.listen(3000, function(){
	console.log('server started at 3000!');
});
