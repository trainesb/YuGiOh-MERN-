require('dotenv').config({ path: './config.env' });
const fs = require('fs')

const express = require('express');
const cors = require('cors');
const dbo = require('./db/conn');


const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./routes/sets'));
app.use(require('./routes/cards'));
app.use(require('./routes/category'));
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Global error handling
app.use(function (err, res, _req) {
  console.error(err);
  res.status(500).send('Something broke!');
});
const db = require("./models");
const Role = db.role;
db.mongoose
  .connect(`mongodb://localhost:27017/yu-gi-oh`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  fs.readdirSync("./collections")
      .forEach(file => {
        console.log(file);
        if(fs.lstatSync("./collections/" + file).isDirectory()) {
          app.use("/api", require("./collections/" + file + "/route"))
        }
      })

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
