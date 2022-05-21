const express = require('express');
const axios = require('axios');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
const categoryRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// GET ALL CATEGORIES
categoryRoutes.route("/api/categories").get(async function(req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("category")
    .find({})
    .toArray(function (err, result) {
      if(err) {
        res.status(400).send("Error fetching categories!")
      } else {
        res.json(result)
      }
    })
})


// CREATE NEW CATEGORY
categoryRoutes.route('/api/category').post(function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("category")
    .insertOne(req.body, function(err, result) {
      if(err) {
        res.status(400).send("Error inserting category!")
      } else {
        console.log(`Added a new category with id ${result.insertedId}`)
        res.status(204).send();
      }
    })
})

module.exports = categoryRoutes;
