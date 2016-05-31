var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
	name: String,
	team: String,
	ppg: Number,
	apg: Number,
	rpg: Number,
	spg: Number,
	bpg: Number,
	fgp: Number,
	link: String,
	tweets: [],
	screenName: String,
	jersey: String,
	jerseyStore: String,
	facebook: String,
	instagram: String
});

mongoose.model('Player', PlayerSchema);