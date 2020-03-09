const express = require('express');
const router = express.Router();
const blogModel = require('../models/blogModel');
const commentModel = require('../models/commentModel');

router.get('/', async function(req, res, next) {
  const blogData = await blogModel.getBlogEntries();

  res.render('template', { 
    locals:{
      title: 'Cat Blog',
      blogData: blogData,
      userData: req.session
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
            commentData: commentData,
            userData: req.session
        },
        partials: {
            partial: 'blog-partial'
        }
    });
});

router.post('/comment', async (req, res, next) => {
  const { user_id, blog_id, comment } = req.body;
  const newComment = new commentModel(null, user_id, blog_id, comment);
  newComment.addComment();

  res.status(200).redirect(`/blog/${blog_id}`);
})

module.exports = router;
