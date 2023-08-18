const mongoose = require('mongoose')
const Schema = mongoose.Schema({
	createdAt: {type: Date, default: Date.now, immutable: true}, //Date
	updatedAt: {type: Date, default: Date.now}, //Date
	race: {type: String}, //Short Text
	yugioh_cards: {type: [mongoose.ObjectId], ref: 'yugioh_cards'}, //Relation - one to many
})

module.exports = mongoose.model('yugioh_card_races', Schema)
