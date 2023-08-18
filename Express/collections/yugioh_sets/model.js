const mongoose = require('mongoose')
const Schema = mongoose.Schema({
	createdAt: {type: Date, default: Date.now, immutable: true}, //Date
	updatedAt: {type: Date, default: Date.now}, //Date
	set_code: {type: String}, //Short Text
	num_of_cards: {type: Number, min: 0}, //Number
	tcg_date: {type: Date}, //Date
	yugioh_cards: {type: [mongoose.ObjectId], ref: 'yugioh_cards'}, //Relation - many to many
	set_name: {type: String, unique: true}, //Short Text
})

module.exports = mongoose.model('yugioh_sets', Schema)
