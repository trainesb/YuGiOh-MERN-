const express = require('express')
const { getAll, getCount, findOne, updateOne, deleteOne, createOne } = require('./controller')

const router = express.Router()
router.get('/yugioh_archetypes', getAll)
router.get('/yugioh_archetypes/count', getCount)
router.get('/yugioh_archetypes/:id', findOne)
router.put('/yugioh_archetypes/:id', updateOne)
router.delete('/yugioh_archetypes/:id', deleteOne)
router.post('/yugioh_archetypes', createOne)
module.exports = router
