const express = require('express')
const { getAll, getCount, findOne, updateOne, deleteOne, createOne } = require('./controller')

const router = express.Router()
router.get('/yugioh_attributes', getAll)
router.get('/yugioh_attributes/count', getCount)
router.get('/yugioh_attributes/:id', findOne)
router.put('/yugioh_attributes/:id', updateOne)
router.delete('/yugioh_attributes/:id', deleteOne)
router.post('/yugioh_attributes', createOne)
module.exports = router
