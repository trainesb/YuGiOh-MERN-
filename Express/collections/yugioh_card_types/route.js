const express = require('express')
const { getAll, getCount, findOne, updateOne, deleteOne, createOne } = require('./controller')

const router = express.Router()
router.get('/yugioh_card_types', getAll)
router.get('/yugioh_card_types/count', getCount)
router.get('/yugioh_card_types/:id', findOne)
router.put('/yugioh_card_types/:id', updateOne)
router.delete('/yugioh_card_types/:id', deleteOne)
router.post('/yugioh_card_types', createOne)
module.exports = router
