const express = require('express');
const axios = require('axios');
const ObjectId = require('mongodb').ObjectId;

// recordRoutes is an instance of the express router.
// We use it to define our routes.
const setsRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// GET ALL SETS
setsRoutes.route('/api/allCardSets').get(async function(req, res){
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('cardsets')
    .find({})
    .toArray(function (err, result) {
      if(err){
        res.status(400).send("Error fetching sets!");
      } else {
        res.json(result);
      }
    });
  console.log('done');
});

// CREATE NEW SET
setsRoutes.route('/api/set').post(function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("cardsets")
    .insertOne(req.body, function(err, result) {
      if(err) {
        res.status(400).send("Error inserting set!")
      } else {
        console.log(`Added a new set with id ${result.insertedId}`)
        res.status(204).send();
      }
    })
})

// UPDATE A SET BY ID
setsRoutes.route('/api/set/category').post(function (req, res) {
  const dbConnect = dbo.getDb()
  console.log(req.body)
  const setQuery = { _id: ObjectId(req.body.id) }
  const updates = {
    $set: {
      category_id: req.body.category_id
    }
  }

  dbConnect
    .collection("cardsets")
    .updateOne(setQuery, updates, function (err, _result) {
      if(err) {
        res.status(400).send(`Error updating set category with id ${setQuery.id}!`)
      } else {
        console.log('Category has been assigned to set')
      }
    })

  res.end()
})

// GET SET BY ID
setsRoutes.route('/api/set/:id').get(function (req, res) {
  console.log(req.params.id)

  const dbConnect = dbo.getDb()
  dbConnect
    .collection("cardsets")
    .findOne({ _id: ObjectId(req.params.id) })
    .then(result => {
      if(result) {
        res.json(result)
      } else {
        res.status(400).send(`Error fetching sets with id: ${req.params.id}!`);
      }
    })
})

// GET SET BY SET_CODE
setsRoutes.route('/api/set/setcode/:set_code').get(function (req, res) {
  const dbConnect = dbo.getDb()
  dbConnect
    .collection("cardsets")
    .findOne({ set_code: req.params.set_code })
    .then(result => {
      if(result) {
        res.json(result)
      } else {
        res.status(400).send(`Error fetching sets with set code: ${req.params.set_code}!`);
      }
    })
})

// GET ALL SETS BY CATEGORY ID
setsRoutes.route('/api/setByCategory/:category_id').get(async function (req, res) {
  const dbConnect = dbo.getDb()

  dbConnect
    .collection("cardsets")
    .find({ category_id: req.params.category_id })
    .sort({ tcg_date: -1 })
    .toArray(function (err, result) {
      if(err) {
        res.status(400).send(`Error getting sets by category id: ${req.params.category_id}`)
      } else {
        res.json(result)
      }
    })
})

// COMBINE SETS BY SET_CODE
setsRoutes.route('/api/combine-sets').get(function (req, res) {
  const dbConnect = dbo.getDb()
  dbConnect
    .collection("cardsets")
    .find({})
    .toArray(function (err, results) {
      if(err){
        res.status(400).send("Error fetching sets!");
      } else {
        for (let i=0; i<results.length; i++) {
          let result = results[i]
          dbConnect
            .collection("cardsets")
            .find({ set_code: result.set_code })
            .toArray(function (err, rslt) {
              if(err){
                console.log(err);
              } else if(rslt.length > 1) {
                const setQuery = { _id: ObjectId(rslt[0]._id) }
                let cnt = 0
                for(let i=1; i<rslt.length; i++) {
                  cnt += rslt[i].num_of_cards
                }
                const updates = { $inc: { num_of_cards: cnt } }

                dbConnect
                  .collection("cardsets")
                  .updateOne(setQuery, updates, function (err, _result) {
                    if(err) {
                      res.status(400).send(`Error updating set category with id ${setQuery.id}!`)
                    } else {
                      console.log('Number of cards in set has been increased')

                      for(let i=1; i<rslt.length; i++) {
                        dbConnect
                          .collection("cardsets")
                          .deleteOne({ _id: ObjectId(rslt[i]._id) }, function (err, _result) {
                            if(err) {
                              res.status(400).send(`Error deleting Set with id: ${rslt[i]._id}`)
                            } else {
                              console.log(`Set with Id: ${rslt[i]._id} has been deleted`)
                            }
                          })
                      }
                    }
                  })

              }
            })

            res.end()
        }
      }
    });
})

// SORT CARDS IN SUBSETS BY SET_CODE
setsRoutes.route('/api/sortCards').get(function (req, res) {
  const dbConnect = dbo.getDb()

  console.log('Sort CARDS!!!')

  dbConnect
      .collection("cardsets")
      .find({})
      .toArray(function (err, result) {
        if(err) {
          res.status(400).send(`Error getting sets`)
        } else if (result.length > 0) {
          for(let i=0; i<result.length; i++) {
            if('subsets' in result[i]) {
              for(let n=0; n<result[i].subsets.length; n++) {
                console.log(result[i].set_code)
                let setQuery = { "subsets.name": result[i].subsets[n].name  }

                let sortedCards = result[i].subsets[n].cards.sort((a,b) => (a.set_code > b.set_code) ? 1 : ((b.set_code > a.set_code) ? -1 : 0))
                console.log(sortedCards)

                let updates = {
                  $set: {
                    "subsets.$.cards": sortedCards
                  }
                }

                dbConnect
                  .collection('cardsets')
                  .updateOne(setQuery, updates, function (err, _result) {
                    if(err) {
                      res.status(400).send(`Error sorting cards for subset: ${result[i].subsets[n].name} and set: ${result[i].set_code}!`)
                    } else {
                      console.log(`Subset: ${result[i].subsets[n].name} has been assigned to set`)
                    }
                  })
              }
            }
          }
        }
      })
})

//
// setsRoutes.route('/api/temp').get(function (req, res) {
//   const dbConnect = dbo.getDb()
//
//   dbConnect
//     .collection("cardsets")
//     .find({})
//     .toArray(function (err, result) {
//       if(err) {
//         res.status(400).send(`Error getting sets`)
//       } else if (result.length > 0) {
//         for(let i=0; i<result.length; i++) {
//           if('subsets' in result[i]) {
//             for(let n=0; n<result[i].subsets.length; n++) {
//               console.log(result[i].set_code)
//               let setQuery = { "subsets.name": result[i].subsets[n].name  }
//
//               let updates = {
//                 $set: {
//                   "subsets.$.num_of_cards": result[i].subsets[n].cards.length
//                 }
//               }
//
//               dbConnect
//                 .collection('cardsets')
//                 .updateOne(setQuery, updates, function (err, _result) {
//                   if(err) {
//                     res.status(400).send(`Error adding num: ${result[i].subsets[n].cards.length} of cards for subset: ${result[i].subsets[n].name} and set: ${result[i].set_code}!`)
//                   } else {
//                     console.log(`Subset: ${result[i].subsets[n].name} has been assigned to set`)
//                   }
//                 })
//             }
//           }
//         }
//       }
//     })
// })
// //
// // GET ALL SUBSETS
// setsRoutes.route('/api/getSubsets').get(function (req, res) {
//   const dbConnect = dbo.getDb()
//
//   dbConnect
//     .collection("cards")
//     .find({})
//     .toArray(function (err, result) {
//       if(err){
//         res.status(400).send("Error fetching listings!");
//       } else if (result.length > 1) {
//         for(let i=0; i < result.length; i++) {
//           if("card_sets" in result[i]) {
//             let cardSets = result[i].card_sets
//             for(let n=0; n < cardSets.length; n++) {
//               let subset = cardSets[n]
//
//               let setQuery = { set_code: subset.set_code.split('-')[0] }
//
//               let name = subset.set_code.slice(0, -3)
//               if(name[name.length-1] === '-') { name = subset.set_code.slice(0, -4) }
//
//               let updates = {
//                 $addToSet: {
//                   subsets: {
//                     name: name,
//                     cards: [],
//                     num_of_cards: 0
//                   }
//                 }
//               }
//
//               dbConnect
//                 .collection("cardsets")
//                 .updateOne(setQuery, updates, function (err, _result) {
//                   if(err) {
//                     res.status(400).send(`Error adding subset ${subset.set_code.slice(0, -3)} to set ${subset.set_code.split('-')[0]}!`)
//                   } else {
//                     console.log(`Subset: ${subset.set_code.slice(0, -3)} has been assigned to set`)
//                   }
//                 })
//
//             }
//           }
//         }
//       }
//
//       res.end()
//     });
// })
//
// // ADD CARDS TO SUBSETS
// setsRoutes.route('/api/addCardsToSubsets').get(function (req, res) {
//   const dbConnect = dbo.getDb()
//
//   dbConnect
//     .collection("cards")
//     .find({})
//     .toArray(function (err, result) {
//       if(err){
//         res.status(400).send("Error fetching listings!");
//       } else if (result.length > 1) {
//         for(let i=0; i < result.length; i++) {
//           if("card_sets" in result[i]) {
//             let cardSets = result[i].card_sets
//             for(let n=0; n < cardSets.length; n++) {
//               let subset = cardSets[n]
//
//               let name = subset.set_code.slice(0, -3)
//               if(name[name.length-1] === '-') { name = subset.set_code.slice(0, -4) }
//
//               console.log(name)
//               let setQuery = { "subsets.name": name }
//
//               console.log(result[i].card_images[0].id)
//               // let updates = {
//               //   $push: {
//               //     "subsets.$.cards": ObjectId(result[i]._id)
//               //   }
//               // }
//
//               let updates = {
//                 $addToSet: {
//                   "subsets.$.cards": {
//                     id: result[i]._id,
//                     name: result[i].name,
//                     type: result[i].type,
//                     desc: result[i].desc,
//                     race: result[i].race,
//                     archetype: result[i].archetype,
//                     set_code: subset.set_code,
//                     image_id: result[i].card_images[0].id,
//                     card_prices: result[i].card_prices
//                   }
//                 }
//               }
//
//               dbConnect
//                 .collection("cardsets")
//                 .updateOne(setQuery, updates, {multi: true}, function (err, _result) {
//                   if(err) {
//
//                     res.status(400).send(`Error adding subset ${err}`)
//                   } else {
//                     console.log(`Subset: ${subset.set_code.slice(0, -3)} has been assigned to set`)
//                   }
//                 })
//
//             }
//           }
//         }
//       }
//     });
// })


module.exports = setsRoutes;
