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
  image: {
    type: String
  },
  preview: {
    type: String
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: String,
    required: true
  },
  favourite: {
    type: Boolean,
    default: false
  }
});

// Create model from schema using model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Idiom model
module.exports = Article;
