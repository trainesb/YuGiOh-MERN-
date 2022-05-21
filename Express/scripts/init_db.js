const axios = require('axios');


// This will help us connect to the database
const dbo = require('../db/conn');

axios
  .get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(data => {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection('cards')
      .insertMany(data.data.data, { ordered: true });
    console.log('done');
  })

// All Cardsets
axios
  .get('https://db.ygoprodeck.com/api/v7/cardsets.php')
  .then(data => {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection('cardsets')
      .insertMany(data.data, { ordered: true });
    console.log('done');
  })

axios
  .get('https://db.ygoprodeck.com/api/v7/archetypes.php')
  .then(data => {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection('archetypes')
      .insertMany(data.data, { ordered: true });
  })
