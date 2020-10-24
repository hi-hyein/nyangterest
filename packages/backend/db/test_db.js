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

module.exports = {
    connect: mysql.createConnection(config),
    createDB: con => {
        con.connect('CREATE DATABASE test_nyangterest',(err, result)=>{
            if(err) console.log('mysql error create:'+err)
            console.log('SUCCESS DATABASE TEST CREATE!')
        })
    },
    dropDB: con => {
        con.connect('DROP DATABASE test_nyangterest',(err, result)=>{
            if(err) console.log('mysql error drop:'+err)
            console.log('SUCCESS DATABASE TEST DROP!')
        })
    },
}