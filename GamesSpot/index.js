#!/usr/bin/node
const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const connection = mysql.createConnection(dbconfig);

  
  // 데이터베이스 연결 확인
  connection.connect((err) => {
	if (err) {
	  console.error('Error connecting to database: ', err);
	  return;
	}
	console.log('Connected to database!');
  });

const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('view', path.join(__dirname));

app.use(express.json());
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
		origin:'https://gamesspot.store',
		credentials : true,
	})
);

app.use(express.urlencoded({extended: false}));
app.use(express.static('front'));

//app.get('/api', (req, res) => {
//	connection.query('SELECT * FROM GamesSpot', (error, rows) => {
//		if (error) throw error;
//		res.send(rows);
//	});
//});

app.post('/membership', (req, res) => {
	const {id, password, nickname, email} = req.body;

	connection.query('INSERT INTO user-info (id, pw, nickname, email) VALUES (?, ?, ?, ?)', [id, password , nickname, email], (err, result) => {
	if (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to register' });
	} else {
		res.json({ message: 'Successfully registered' });
	}
	});
});





app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/front/main.html'));
});

app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname + '/front/login.html'));
});


app.get('/collection_home', (req, res) => {
        res.sendFile(path.join(__dirname + '/front/collection_home.html'));
});


app.get('/game_home', (req, res) => {
        res.sendFile(path.join(__dirname + '/front/game_home.html'));
});

app.get('/membership', (req, res) => {
        res.sendFile(path.join(__dirname + '/front/membership.html'));
});

app.get('/findID', (req, res) => {
        res.sendFile(path.join(__dirname + '/front/find_id.html'));
});

app.get('/findPw', (req, res) => {
        res.sendFile(path.join(__dirname + '/front/find_pw.html'));
});

app.get('/search_game', (req, res) => {
	res.sendFile(path.join(__dirname + '/front/search_game.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

