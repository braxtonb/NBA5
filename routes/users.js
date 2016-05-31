var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

var User = mongoose.model('User');

var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Register a user */ 
router.post('/register', function(req, res, next) {
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({ message: 'Please fill out all fields' });
	}

	var user = new User();
	user.username = req.body.username;
	user.setPassword(req.body.password);

	user.save(function(err) {
		if (err) { return next(err); }

		return res.json({ token: user.generateJWT() });
	});
});

/* Login a user */ 
router.post('/login', function(req, res, next) {
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({ message: 'Please fill out all fields' });
	}

	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }

		if (user) {
			return res.json({ token: user.generateJWT() });
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

/* Return ID for Username */ 
router.post('/id', auth, function(req, res, next) {
	var username = req.body.username;

	User.find({ username: username }, { _id: 1 }, function(err, user) {
		if (err) { return next(err); }

		res.json(user);
	});
});

/* Package One User */ 
router.param('id', function(req, res, next, id) {
	var query = User.findById(id);

	query.exec(function(err, user) {
		if (err) { return next(err); }

		if (!user) { return next(new Error('can\'t find user')); }

		req.user = user;
		return next();
	});
});

/* GET A User */ 
router.get('/:id', function(req, res, next) {
	req.user.populate({ path: 'favorites' }, function(err, user) {
		if (err) { return next(err); }

		res.json(user);	
	});
});

module.exports = router;
