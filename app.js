const express = require('express');
const mysql=require('mysql')
const myConnection=require('express-myconnection')

const app = express();

app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    port: 3306,
    database: 'dbs7b25'
}))


app.get('/', (req, res) => res.send('BUENOS DÍAS, S7A!'));
app.listen(8080);