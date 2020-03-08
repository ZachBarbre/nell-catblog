const express = require('express');
const router = express.Router();
const blogModel = [] /// make the model

/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('template', { 
    locals:{
      title: 'Cat Blog'
    },
      partials:{
        partial: 'index-partial'
      }});
});

module.exports = router;
