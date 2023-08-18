const mongoose = require('mongoose')
const Schema = mongoose.Schema({
	createdAt: {type: Date, default: Date.now, immutable: true}, //Date
	updatedAt: {type: Date, default: Date.now}, //Date
	yugioh_cards: {type: [mongoose.ObjectId], ref: 'yugioh_cards'}, //Relation - one to many
	attribute: {type: String, unique: true}, //Short Text
})

module.exports = mongoose.model('yugioh_attributes', Schema)
