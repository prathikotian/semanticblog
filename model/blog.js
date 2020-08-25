const mongoose = require('mongoose'),
      DB = process.env.DB || 'mongodb://localhost/semantic_blog';

// Mongoose DB Connection Setup
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(DB)

// Create Blog Schema Structure
const blogSchema = new mongoose.Schema({
  title: String,
  image: {
    type: String,
    default: "/img/no-image-available.jpg"
  },
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
})

// Create Blog DB Model
module.exports = mongoose.model("semanticblog", blogSchema)