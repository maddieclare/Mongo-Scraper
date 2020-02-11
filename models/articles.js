const mongoose = require("mongoose");

// Get the schema constructor
const Schema = mongoose.Schema;

// Use the Schema constructor to create a new IdiomSchema object
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  time: {
    type: String,
    required: true
  }
});

// Create model from schema using model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Idiom model
module.exports = Article;
