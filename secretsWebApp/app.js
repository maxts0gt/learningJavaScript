//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { renameSync } = require('fs');
const app = express();

//Following is for level4-->
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
//<--
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(
	session({
		secret: 'Our little secret.',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

//Following is for level3 -->
// const secret = process.env.SECRET;
// <--

mongoose.connect('mongodb://localhost:27017/userDB');
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	googleId: String,
	secret: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//Following is for level3 -->
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });
// <--

const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/secrets',
			// userProfileURL: 'https://googleapis.com/oauth2/v3/userinfo',
		},
		function (accessToken, refreshToken, profile, cb) {
			User.findOrCreate(
				{
					googleId: profile.id,
				},
				function (err, user) {
					return cb(err, user);
				}
			);
		}
	)
);

app.get('/', function (req, res) {
	res.render('home');
});

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile'],
	})
);

app.get(
	'/auth/google/secrets',
	passport.authenticate('google', {
		failureRedirect: '/login',
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect('/secrets');
	}
);

app.get('/login', function (req, res) {
	res.render('login');
});
app.get('/register', function (req, res) {
	res.render('register');
});

app.get('/secrets', function (req, res) {
	User.find(
		{
			secret: {
				$ne: null,
			},
		},
		function (err, foundUsers) {
			if (err) {
				console.log(err);
			} else {
				if (foundUsers) {
					res.render('secrets', {
						usersWithSecrets: foundUsers,
					});
				}
			}
		}
	);
});

app.get('/submit', function (req, res) {
	if (req.isAuthenticated()) {
		res.render('submit');
	} else {
		console.log('not authenticated');
		res.redirect('/login');
	}
});

app.post('/submit', function (req, res) {
	const submittedSecret = req.body.secret;
	console.log(req.user.id);
	User.findById(req.user.id, function (err, foundUser) {
			if (err) {
				console.log(err);
			} else {
				if (foundUser) {
					foundUser.secret = submittedSecret;
					foundUser.save(function () {
						res.redirect('/secrets');
					});
				}
			}
		});
});

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

app.post('/register', function (req, res) {
	User.register(
		{
			username: req.body.username,
		},
		req.body.password,
		function (err, user) {
			if (err) {
				console.log(err);
				res.redirect('/register');
			} else {
				passport.authenticate('local')(req, res, function () {
					res.redirect('/secrets');
				});
			}
		}
	);
});

app.post('/login', function (req, res) {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
	});

	req.login(user, function (err) {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate('local')(req, res, function () {
				res.redirect('/secrets');
			});
		}
	});
});

//Following is for level 1, 2, 3, and 4 authentication -->
// app.post('/register', function (req, res) {
// 	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
// 		// Store hash in your password DB.
// 		const newUser = new User({
// 			username: req.body.username,
// 			password: hash,
// 		});
// 		newUser.save(function (err) {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.render('secrets');
// 			}
// 		});
// 	});
// });

// app.post('/login', function (req, res) {
// 	const username = req.body.username;
// 	// const password = md5(req.body.password);
// 	const password = req.body.password;

// 	User.findOne({ username: username }, function (err, user) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			if (user) {
// 				// if (user.password === password) {
// 				bcrypt.compare(password, user.password, function (err, result) {
// 					if (result === true) {
// 						res.render('secrets');
// 					}
// 				});
// 			}
// 		}
// 	});
// });
// <--

app.listen(3000, function () {
	console.log('Express server listening on port 3000');
});
