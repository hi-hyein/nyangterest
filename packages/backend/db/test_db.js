const mysql = require('mysql');
const path = require("path");
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, './.env') })

const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'nyangterest'
}

const connection = mysql.createConnection(config);
const createDatabase = () => {
    connection.query('CREATE DATABASE nyangterest');
}
const dropDatabase = () => {
    connection.query('DROP DATABASE nyangterest');
}
const createTableMember = () => {
    connection.query("CREATE TABLE nyang_member (id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255), password VARCHAR(255), signupdate INT(10), certify TINYINT(1), token VARCHAR(255), snsName VARCHAR(10))");
}
const addMember = () => {
    const sql = "INSERT INTO `nyang_member` (`email`, `password`, `signupdate`, `certify`, `token`, `snsName`) VALUES ( ?,?,?,?,?,? )";
    const params = ['test@naver.com','e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', '20200101', 1, '$2a$10$lkWSgteSe6BiZUSr5QsfWOxEaFscuYZtLvio3aHolQhoRDrJ8Nt5G', null]
    connection.query(sql,params);
}
module.exports = {
    connection: connection,
    createDatabase: createDatabase,
    dropDatabase: dropDatabase,
    createTableMember: createTableMember,
    addMember: addMember,
}