//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent =
	'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet just' 
const aboutContent =
	'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus'
const contactContent =
	'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur'

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/blogDB');

const Post = mongoose.model('Post', {
	title: String,
	content: String,
});

app.get('/', function (req, res) {
	Post.find({}, function (err, posts) {
		res.render('home', {
			startingContent: homeStartingContent,
			posts: posts,
		});
	});
});

app.get('/about', function (req, res) {
	res.render('about', { aboutContent: aboutContent });
});

app.get('/contact', function (req, res) {
	res.render('contact', { contactContent: contactContent });
});

app.get('/compose', function (req, res) {
	res.render('compose');
});

app.post('/compose', function (req, res) {
	const post = new Post({
		title: req.body.postTitle,
		content: req.body.postBody,
	});

	post.save().then(() => console.log('Done!'));

	res.redirect('/');
});

app.get('/posts/:postId', function (req, res) {
	const requestedPostId = req.params.postId;
	console.log(requestedPostId);
	Post.findOne({ _id: requestedPostId }, function (err, post) {
		res.render('post', {
			title: post.title,
			content: post.content,
		});
	});
});

app.listen(3000, function () {
	console.log('Server started on port 3000');
});
