const express = require('express')
const { getAll, getCount, findOne, updateOne, deleteOne, createOne } = require('./controller')

const router = express.Router()
router.get('/yugioh_cards', getAll)
router.get('/yugioh_cards/count', getCount)
router.get('/yugioh_cards/:id', findOne)
router.put('/yugioh_cards/:id', updateOne)
router.delete('/yugioh_cards/:id', deleteOne)
router.post('/yugioh_cards', createOne)
module.exports = router
