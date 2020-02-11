require('dotenv').config();

const mongoose = require("mongoose");

const express = require("express");

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes");

// Start the server
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}!`);
});


