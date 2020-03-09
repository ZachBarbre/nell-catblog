const express = require('express'),
  router = express.Router(),
  blogModel = require('../models/blogModel');

router.get('/', async function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'Add New Blog Post',
      userData: req.session
    }, 
    partials:{
      partial: 'admin-partial'
    }
  });
});

router.post('/', async (req, res, next) => {
    const { user_id, title, blog } = req.body;
    const postBlog = new blogModel(null, user_id, title, blog);
    postBlog.addBlogPost();
    res.status(200).redirect('/blog');
  });

  module.exports = router;