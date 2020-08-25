const routes = require('express').Router(),
      blog = require('../model/blog')

// RESTful Routes
// Redirecting to Index Route
  routes.get('/', (req, res) => {
    res.redirect('/blogs')
  })
  
  // Index Route
  routes.get('/blogs', (req, res) => {
    blog.find({}, (err, blogs) => {
      if(err) {
        console.log("ERROR FETCHING BLOGS ==========>>>>> ", err)
      } else {
        res.render('index', {blogs: blogs})
      }
    })
  })
  
  // New Route
  routes.get('/blogs/new', (req, res) => {
    res.render('new')
  })
  
  // Create Route
  routes.post('/blogs', (req, res) => {
    // prevents script atacks or any security threat
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
  routes.get('/blogs/:id', (req, res) => {
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
  routes.get('/blogs/:id/edit', (req, res) => {
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
  routes.put('/blogs/:id', (req, res) => {
    // prevents script atacks or any security threat
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
  routes.delete('/blogs/:id', (req, res) => {
    blog.findByIdAndDelete(req.params.id, (err, deletedBlog) => {
      if(err) {
        console.log("ERROR DELETING BLOG ======>>>", err)
        res.redirect('/blogs')
      } else {
        res.redirect('/blogs')
      }
    })
  })

module.exports = routes;