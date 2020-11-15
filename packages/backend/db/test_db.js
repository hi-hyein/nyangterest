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
        con.query('CREATE DATABASE nyangterest',(err, result)=>{
            if(err) console.log('mysql error create:'+err)
            console.log('SUCCESS DATABASE TEST CREATE!')
        })
    },
    dropDB: con => {
        con.query('DROP DATABASE nyangterest',(err, result)=>{
            if(err) console.log('mysql error drop:'+err)
            console.log('SUCCESS DATABASE TEST DROP!')
        })
    },
    createTable: (con, sql) => {
        con.query(sql, (err,result)=>{
            if (err) throw err;
            console.log("Table created");
        })
    }
}