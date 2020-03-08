const express = require('express');
const router = express.Router();
const blogModel = require('../models/blogModel');

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

router.get('/:blog_id?', async (req, res, next) => {
    const blogId = req.params.blog_id;
    const blogData = await blogModel.getOneBlog(blogId);
    const commentData = await blogModel.getBlogComments(blogId);

    res.render('template', {
        locals:{
            title: `${blogData.title}`,
            blogData: blogData,
            commentData: commentData
        },
        partials: {
            partial: 'blog-partial'
        }
    });
});

module.exports = router;
