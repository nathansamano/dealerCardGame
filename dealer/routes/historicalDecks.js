var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var express = require('express');
var router = express.Router();

// must have mongo running already
mongoose.connect('mongodb://localhost/vvcardgame');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log("connection to db is open");
});

/******* Got this from index.js and users.js ******/
/* GET historical decks listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
/**************************************************/

// Create schema for db
var historicalDeckSchema = new Schema({
  board: {
    type: Schema.ObjectId,
    ref: 'board'
  },
  score_pct: Number,
  earned_points: Number,
  possilbe_points: Number
});

var hDeck = mongoose.model('historicalDeck', historicalDeckSchema);

/************** Testing Writing to DB ******************/

var testDeck = new hDeck({board: {value: 3, suit: 'H'}, score_pct: 14,
  earned_points: 15, possilbe_points: 104});

console.log("<<<<>>>><<<<<>>>>>><<<<>>>",testDeck.score_pct);