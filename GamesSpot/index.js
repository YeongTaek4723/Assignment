#!/usr/bin/node
const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const connection = mysql.createConnection(dbconfig);

const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('view', path.join(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(
	session({
		secret: 'g7$In!2@S#%90c$5mB',
		resave: true,
		saveUninitialized: true
	})
);

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
	res.sendFile(path.join(__dirname + './front/main.html'));
});

app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname + './front/login.html'));
});


app.get('/collection', (req, res) => {
        res.sendFile(path.join(__dirname + './front/collection_info.html'));
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

