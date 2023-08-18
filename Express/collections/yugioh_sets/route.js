const express = require('express')
const { getAll, getCount, findOne, updateOne, deleteOne, createOne } = require('./controller')

const router = express.Router()
router.get('/yugioh_sets', getAll)
router.get('/yugioh_sets/count', getCount)
router.get('/yugioh_sets/:id', findOne)
router.put('/yugioh_sets/:id', updateOne)
router.delete('/yugioh_sets/:id', deleteOne)
router.post('/yugioh_sets', createOne)
module.exports = router
