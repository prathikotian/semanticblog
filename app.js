const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      codeSanitizer = require('express-sanitizer'),
      PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(codeSanitizer())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// Mongoose DB Connection Setup
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb://localhost/semantic_blog')

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
let blog = mongoose.model("semanticblog", blogSchema)

// RESTful Routes
// Redirecting to Index Route
app.get('/', (req, res) => {
  res.redirect('/blogs')
})

// Index Route
app.get('/blogs', (req, res) => {
  blog.find({}, (err, blogs) => {
    if(err) {
      console.log("ERROR FETCHING BLOGS ==========>>>>> ", err)
    } else {
      res.render('index', {blogs: blogs})
    }
  })
})

// New Route
app.get('/blogs/new', (req, res) => {
  res.render('new')
})

// Create Route
app.post('/blogs', (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body)
  blog.create(req.body.blog, (err, result) => {
    if(err) {
      console.log('ERROR CREATING NEW BLOG ========>>>', err)
      res.render('new')
    } else {
      res.redirect('/blogs')
    }
  })
})

// Show Route
app.get('/blogs/:id', (req, res) => {
  blog.findById(req.params.id, (err, blog) => {
    if(err) {
      console.log('ERROR WHILE FINFIND A BLOG =======>>> ', err)
      res.redirect('/blogs')
    } else {
      res.render('show', {data: blog})
    }
  })
})

// Edit Route
app.get('/blogs/:id/edit', (req, res) => {
  blog.findById(req.params.id, (err, foundBlog) => {
    if(err) {
      console.log("ERROR WHILE FETCHING BLOG DATA-------->>>>", err)
      res.redirect('/blogs')
    } else {
      res.render('edit', {blog: foundBlog})
    }
  })
})

// Update Route
app.put('/blogs/:id', (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body)
  blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, result) => {
    if(err) {
      console.log("ERROR UPDATING BLOG=======>>>", err)
      res.redirect('/blogs')
    } else {
      res.redirect(`/blogs/${req.params.id}`)
    }
  })
})

// Delete Route
app.delete('/blogs/:id', (req, res) => {
  blog.findByIdAndDelete(req.params.id, (err, deletedBlog) => {
    if(err) {
      console.log("ERROR DELETING BLOG ======>>>", err)
      res.redirect('/blogs')
    } else {
      res.redirect('/blogs')
    }
  })
})

app.listen(PORT, () => {
  console.log(`semantic blog server is running on port ${PORT}`)
})
