const express = require('express');
const axios = require('axios');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const cardsRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

cardsRoutes.route('/api/allCards').get(async function(req, res){
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('cards')
    .find({})
    .toArray(function (err, result) {
      if(err){
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
  console.log('done');
});

cardsRoutes.route('/api/allArchetypes').get(async function(req, res){
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('archetypes')
    .find({})
    .toArray(function (err, result) {
      if(err){
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

// GET CARDS BY SET_CODE
cardsRoutes.route('/api/cards/:set_code').get(async function(req, res){
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('cards')
    .find({  })
    .toArray(function (err, result) {
      if(err){
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
})

module.exports = cardsRoutes;
