const express = require('express');
const mysql = require('mysql');

const port = 3000;

const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'classicmodels'
});
connection.connect();

app.get('/', (req, res) => res.send('Welcome to the Vulnerable SQL App!'));

app.get('/customers/:customerNumber', (req, res) => {
    connection.query(`SELECT * FROM customers WHERE customerNumber=${req.params.customerNumber};`, function(error, results, fields) {
        if (error) res.send(error);
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Vulnerable API listening on port ${port}`);
});
