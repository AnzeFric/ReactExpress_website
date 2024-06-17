var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var photoSchema = new Schema({
	'name' : String,
	'message' : String,
	'path' : String,
	'postedBy' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'views' : Number,
	'likes' : Number,
	'dislikes' : Number,
	'likedBy': [{
		user: { type: Schema.Types.ObjectId, ref: 'user' }
	}],
	'dislikedBy': [{
		user: { type: Schema.Types.ObjectId, ref: 'user' }
	}],
	'postedOn' : {
		type: Date,
		default: Date.now
	},
	'comments' : [{
        user: String,
        content: String,
        createdAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('photo', photoSchema);
