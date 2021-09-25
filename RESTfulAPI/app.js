//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = {
	title: String,
	content: String,
};

const Article = mongoose.model('Article', articleSchema);

////////////////////////////////ALL ARTICLES ///////////////////////////////////////

app.route('/articles')
	.get(function (req, res) {
		Article.find(function (err, foundArticles) {
			if (!err) {
				res.send(foundArticles);
			} else {
				res.send(err);
			}
		});
	})
	.post(function (req, res) {
		console.log(req.body.title);
		console.log(req.body.content);
		const jack1 = new Article({
			title: req.body.title,
			content: req.body.content,
		});
		jack1.save(function (err) {
			if (!err) {
				res.send('Successfully added a new article.');
			} else {
				res.send(err);
			}
		});
	})
	.delete(function (req, res) {
		Article.deleteMany(function (err) {
			if (!err) {
				res.send('Successfully deleted');
			} else {
				res.send(err);
			}
		});
	});

////////////////////////////////SPECIFIC ARTICLES ///////////////////////////////////////

app.route('/articles/:articleTitle')

	.get(function (req, res) {
		Article.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
			if (foundArticle) {
				res.send(foundArticle);
			} else {
				res.send('No articles found.');
			}
		});
	})
	.put(function (req, res) {
		Article.updateOne(
			{ title: req.params.articleTitle },
			{ title: req.body.title, content: req.body.content },
			function (err) {
				if (!err) {
					res.send('Successfully updated article.');
				} else {
					res.send(err);
				}
			}
		);
	})
	.patch(function (req, res) {
		Article.updateOne({ title: req.params.articleTitle }, { $set: req.body }, function (err) {
			if (!err) {
				res.send('Successfully patched article.');
			} else {
				res.send(err);
			}
		});
	})
	.delete(function (req, res) {
		Article.deleteOne({ title: req.params.articleTitle }, function (err) {
			if (!err) {
				res.send('Successfully deleted articles.');
			} else {
				res.send(err);
			}
		});
	});

// const article = new Article({
// 	title: 'Jack Bauer',
// 	content: "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned.",
// 	__v: 0,
// });

// article.save();

app.listen(3000, function () {
	console.log('Express server listening on port 3000');
});
