var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var twit = require('twitter'),
		twitter = new twit({
			consumer_key: '',
			consumer_secret: '',
			access_token_key: '',
			access_token_secret: ''
		});

/* Mongoose Models */ 
var Player = mongoose.model('Player');

/* GET ALL Players */
router.get('/', function(req, res, next) {
	Player.find(function(err, players) {
		if (err) { return next(err); }

		res.json(players);
	});
});

/* Package an individual player by id */ 
router.param('playerID', function(req, res, next,id) {
	var query = Player.findById(id);

	query.exec(function(err, player) {
		if (err) { return next(err); }

		if (!player) { return next(new Error('can\'t find player')); }

		req.player = player;
		return next();
	});
});

/* GET an Individual Player */
router.get('/:playerID', function(req, res, next) {
	var screenName = req.player.screenName;
	twitter.get('statuses/user_timeline', {screen_name: screenName}, function(error, tweets, response) {
		req.player.tweets = tweets;
		res.json(req.player);
	});
});

/* POST Favorite (Like) a Player's Tweet */ 
router.post('/twitter/favorite', function(req, res, next) {
	var tweetID = req.body.tweetID;
	twitter.post('favorites/create', {id: tweetID}, function(errors, tweet, response) {
		if (errors && errors[0].code === 139) {
			twitter.post('favorites/destroy', {id: tweetID}, function(errors, tweet, response) {
				// console.log(errors);
				res.json({message: 'Unliked'});
			});
		} else {
			res.json({message: 'Liked'});	
		}
	});
});

/* POST Retweet a Player's Tweet */ 
router.post('/twitter/retweet', function(req, res, next) {
	var tweetID = req.body.tweetID;
	twitter.post('statuses/retweet', {id: tweetID}, function(errors, tweet, response) {
		if (errors && errors[0].code === 327) {
			twitter.post('statuses/unretweet', {id: tweetID}, function(erros, tweet, response) {
				res.json({message: 'Unretweeted'});
			});
		} else {
			res.json({message: 'Retweeted'});
		}
	});
});

module.exports = router;