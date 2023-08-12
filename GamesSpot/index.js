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
	const {nickname, id, password, email} = req.body;

	if(nickname && id && password && email){
		connection.query('SELECT * FROM user-info WHERE id = ?', [id], (error, results, fields) => {
			if(error)	throw error;
			if(results.length <= 0){
				connection.query('INSERT INTO user-info (id, pw, nickname, email) VALUES(?, ?, ?, ?)', [id, password, nickname, email], (error, data) => {
					if(error)	throw error2;
					res.send('<script type="text/javascript">alert("회원가입이 완료되었습니다."); location.replace("/login");<script>');
				});
			} else {
				res.send('<script type="text/javascript">alert("이미 사용중인 아이디 입니다."); location.href = "/membership";<script>');
			}
		});	
	} else {
		res.send('<script type="text/javascript">alert("모든 입력칸에 입력을 해주세요."); location.replace = "/membership";<script>');
	}
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

