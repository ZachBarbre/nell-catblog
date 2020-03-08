const express = require('express');
const router = express.Router();
const blogModel = require('../models/blogModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const blogData = await blogModel.getBlogEntries();

  res.render('template', { 
    locals:{
      title: 'Cat Blog',
      blogData: blogData
    },
      partials:{
        partial: 'index-partial'
      }});
});

module.exports = router;
