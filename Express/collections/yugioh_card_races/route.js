const express = require('express')
const { getAll, getCount, findOne, updateOne, deleteOne, createOne } = require('./controller')

const router = express.Router()
router.get('/yugioh_card_races', getAll)
router.get('/yugioh_card_races/count', getCount)
router.get('/yugioh_card_races/:id', findOne)
router.put('/yugioh_card_races/:id', updateOne)
router.delete('/yugioh_card_races/:id', deleteOne)
router.post('/yugioh_card_races', createOne)
module.exports = router
