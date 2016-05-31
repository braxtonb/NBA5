var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

var User = mongoose.model('User');
var Player = mongoose.model('Player');

var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

/* Package a User */ 
router.param('user', function(req, res, next, id) {
	var query = User.findById(id);

	query.exec(function(err, user) {
		if (err) { return next(err); }

		if (!user) { return next(new Error('can\'t find user')); }

		req.user = user;
		return next();
	});
});

/* Package a Player */
router.param('player', function(req, res, next, id) {
	var query = Player.findById(id);

	query.exec(function(err, player) {
		if (err) { return next(err); }

		if (!player) { return next(new Error('can\'t find player')); }

		req.player = player;
		return next();
	});
}); 

/* Add A Favorite to a User's List */ 
router.post('/:user/:player', function(req, res, next) {
	var size = req.user.favorites.length;
	if (size >= 6) {
		return res.json({ message: 'Favorites Full!' });
	}
	/* Find IndexOf Player in User's Favorites to Ensure No Repeats */ 
	var index = req.user.favorites.indexOf(req.player._id);
	if (index !== -1) {
		res.json({ message: 'Player already added!'} );
	} else {
		req.user.favorites.push(req.player);
		req.user.save(function(err, user) {
			if (err) { return next(err); }

			res.json({ message: 'Player added!' });
		});
	}
});

/* Remove a Favorite from a User's List */ 
router.delete('/:user/:player', function(req, res, next) {
	/* Find IndexOf Player in User's Favorites */ 
	var index = req.user.favorites.indexOf(req.player._id);
	/* Remove Player from User's Favorites */ 
	req.user.favorites.splice(index, 1);
	req.user.save(function(err, user) {
		if (err) { return next(err); }

		res.json({ message: 'Player removed!' });
	});
});

module.exports = router;