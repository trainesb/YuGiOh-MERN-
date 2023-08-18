const yugioh_card_races = require('./model')


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
		let tmp_yugioh_card_races = await yugioh_card_races.find(param[0], null, param[1])
			.populate('yugioh_cards')
			.exec()
		res.status(200).json({status: true, result: tmp_yugioh_card_races})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const getCount = async (req, res) => {
	try {
		let tmp_yugioh_card_races = await yugioh_card_races.count(req.query)
		res.status(200).json({status: true, result: tmp_yugioh_card_races})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const findOne = async (req, res) => {
	try {

		let param = await getParams(req.query)
		let tmp_yugioh_card_races = await yugioh_card_races.findOne(param[0], null, param[1])
			.populate('yugioh_cards')
			.exec()
		res.status(200).json({status: true, result: tmp_yugioh_card_races})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const updateOne = async (req, res) => {
	try {
		let tmp_yugioh_card_races = await yugioh_card_races.updateOne({ _id: req.params.id}, req.body)
		res.status(200).json({status: true, result: tmp_yugioh_card_races})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const deleteOne = async (req, res) => {
	try {
		let tmp_yugioh_card_races = await yugioh_card_races.deleteOne({ _id: req.params.id})
		res.status(200).json({status: true, result: tmp_yugioh_card_races})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const createOne = async (req, res) => {
	try {
		let tmp_yugioh_card_races = new yugioh_card_races(req.body)
		tmp_yugioh_card_races.save()
		res.status(200).json({status: true, result: tmp_yugioh_card_races})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}
module.exports = { getAll, getCount, findOne, updateOne, deleteOne, createOne }
