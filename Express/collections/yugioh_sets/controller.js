const yugioh_sets = require('./model')


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
		let tmp_yugioh_sets = await yugioh_sets.find(param[0], null, param[1])
			.populate('yugioh_cards')
			.exec()
		res.status(200).json({status: true, result: tmp_yugioh_sets})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const getCount = async (req, res) => {
	try {
		let tmp_yugioh_sets = await yugioh_sets.count(req.query)
		res.status(200).json({status: true, result: tmp_yugioh_sets})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const findOne = async (req, res) => {
	try {

		let param = await getParams(req.query)
		let tmp_yugioh_sets = await yugioh_sets.findOne(param[0], null, param[1])
			.populate('yugioh_cards')
			.exec()
		res.status(200).json({status: true, result: tmp_yugioh_sets})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const updateOne = async (req, res) => {
	try {
		let tmp_yugioh_sets = await yugioh_sets.updateOne({ _id: req.params.id}, req.body)
		res.status(200).json({status: true, result: tmp_yugioh_sets})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const deleteOne = async (req, res) => {
	try {
		let tmp_yugioh_sets = await yugioh_sets.deleteOne({ _id: req.params.id})
		res.status(200).json({status: true, result: tmp_yugioh_sets})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}

const createOne = async (req, res) => {
	try {
		let tmp_yugioh_sets = new yugioh_sets(req.body)
		tmp_yugioh_sets.save()
		res.status(200).json({status: true, result: tmp_yugioh_sets})
	} catch (error) {
		res.status(400).json({status: false, error: error})
	}
}
module.exports = { getAll, getCount, findOne, updateOne, deleteOne, createOne }
