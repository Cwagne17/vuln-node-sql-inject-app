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

app.get('/', (req, res) => res.send('Welcome to the Secure SQL App!'));

app.get('/customers/:customerNumber', (req, res) => {
    const customerNumber = Number(req.params.customerNumber);
    if (!customerNumber) res.status(400).send("Bad Request, customerNumber must be an integer.");

    connection.query(
        `SELECT * FROM customers WHERE customerNumber=?;`,
        [customerNumber],
        function(error, results, fields) {
            if (error) res.send(error);
            res.send(results);
        }
    );
});

app.listen(port, () => {
    console.log(`Secure API listening on port ${port}`);
});
