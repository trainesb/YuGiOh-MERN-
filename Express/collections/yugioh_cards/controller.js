const yugioh_cards = require('./model')


const getParams = async (query) => {
	try {
		let firstParam = {}
		let secondParam = {}
		for (let item in query) {
			if(item.charAt(0) === '_') {
				secondParam[item.slice(1)] = query[item]
			} else {
				firstParam[item] = query[item]
			}
		}
		return [firstParam, secondParam]
	} catch (err) {
		console.log('Error: ', err)
		return [{}, {}]
	}
}

const getAll = async (req, res) => {
	try {

		let param = await getParams(req.query)
		let tmp_yugioh_cards = await yugioh_cards.find(param[0], null, param[1])
			.populate('yugioh_attributes')
			.populate('race')
			.populate('card_sets')
			.populate({
				path: 'card_sets',
				populate: {
					path: 'image'}})
			.populate({
				path: 'card_sets',
				populate: {
					path: 'image_small'}})
			.populate({
				path: 'card_sets',
				populate: {
					path: 'set'}})
			.populate('yugioh_archetype')
			.populate('yugioh_card_type')
			.exec()
		res.status(200).json({status: true, result: tmp_yugioh_cards})
	} catch (error) {
		console.log('Error: ', error)
		res.status(400).json({status: false, error: error})
	}
}

const getCount = async (req, res) => {
	try {
		let tmp_yugioh_cards = await yugioh_cards.count(req.query)
		res.status(200).json({status: true, result: tmp_yugioh_cards})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const findOne = async (req, res) => {
	try {

		let param = await getParams(req.query)
		let tmp_yugioh_cards = await yugioh_cards.findOne(param[0], null, param[1])
			.populate('yugioh_attributes')
			.populate('race')
			.populate('card_sets')
			.populate({
				path: 'card_sets',
				populate: {
					path: 'image'}})
			.populate({
				path: 'card_sets',
				populate: {
					path: 'image_small'}})
			.populate({
				path: 'card_sets',
				populate: {
					path: 'set'}})
			.populate('yugioh_archetype')
			.populate('yugioh_card_type')
			.exec()
		res.status(200).json({status: true, result: tmp_yugioh_cards})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const updateOne = async (req, res) => {
	try {
		let tmp_yugioh_cards = await yugioh_cards.updateOne({ _id: req.params.id}, req.body)
		res.status(200).json({status: true, result: tmp_yugioh_cards})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const deleteOne = async (req, res) => {
	try {
		let tmp_yugioh_cards = await yugioh_cards.deleteOne({ _id: req.params.id})
		res.status(200).json({status: true, result: tmp_yugioh_cards})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const createOne = async (req, res) => {
	try {
		let tmp_yugioh_cards = new yugioh_cards(req.body)
		tmp_yugioh_cards.save()
		res.status(200).json({status: true, result: tmp_yugioh_cards})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}
module.exports = { getAll, getCount, findOne, updateOne, deleteOne, createOne }
