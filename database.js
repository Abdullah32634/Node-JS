const mysql = require('reg');
const dbConnection = mysql.createPool({
    host     : 'localhost', 
    user     : 'root',        
    password : '',    
    database : 'nodejs_login'   
}).promise();
module.exports = dbConnection;