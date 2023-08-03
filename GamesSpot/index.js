#!/usr/bin/node
const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const connection = mysql.createConnection(dbconfig);

const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');

app.use(
	cors({
		origin:'http://13.125.71.97:3000',
		credentials : true,
	})
);

app.use(express.static('front'));

app.get('/api', (req, res) => {
	connection.query('SELECT * FROM GamesSpot', (error, rows) => {
		if (error) throw error;
		res.send(rows);
	});
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './', 'front', 'main.html'));
});



app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
