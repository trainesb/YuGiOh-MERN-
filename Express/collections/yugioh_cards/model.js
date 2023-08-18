const mongoose = require('mongoose')
const Schema = mongoose.Schema({
	createdAt: {type: Date, default: Date.now, immutable: true}, //Date
	updatedAt: {type: Date, default: Date.now}, //Date
	name: {type: String}, //Short Text
	desc: {type: String}, //Long Text
	atk: {type: String}, //Short Text
	def: {type: String}, //Short Text
	level: {type: Number}, //Number
	yugioh_attributes: {type: mongoose.ObjectId, ref: 'yugioh_attributes'}, //Relation - many to one
	race: {type: mongoose.ObjectId, ref: 'yugioh_card_races'}, //Relation - many to one
	card_sets: {type: [mongoose.ObjectId], ref: 'yugioh_sets'}, //Component
	scale: {type: Number}, //Number
	linkval: {type: String}, //Short Text
	linkmarkers: {type: String}, //Short Text
	yugioh_archetype: {type: mongoose.ObjectId, ref: 'yugioh_archetypes'}, //Relation - many to one
	yugioh_card_type: {type: mongoose.ObjectId, ref: 'yugioh_card_types'}, //Relation - many to one
})

module.exports = mongoose.model('yugioh_cards', Schema)
