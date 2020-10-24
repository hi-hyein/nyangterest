const mysql = require('mysql');
const path = require("path");
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, './.env') })

const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: process.env.PASSWORD,
    database: ''
}

const connect = mysql.createConnection(config);

const test_db_connect = function(con){
    con.connect(function(err){
        if(err){
            console.error('mysql connection error :' + err);
        }else {
            console.info('mysql is connected successfully.')
        }
    })
}

test_db_connect(connect);


module.exports = {
    text_db_connect: connect
}