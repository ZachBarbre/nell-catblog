const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  userModel = require('../models/userModel');

router.get('/signup', async function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'Signup'
    }, 
    partials:{
      partial: 'signup-partial'
    }
  });
});

router.get('/login', async function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'Login'
    }, 
    partials:{
      partial: 'login-partial'
    }
  });
});

router.post('/signup', async (req, res, next) => {
  const { username, email, password, is_admin } = req.body;
  const isAdmin = !(is_admin === 'false');

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt)

  const user = new userModel(null, username, email, hash, isAdmin);
  user.addUser();
  res.status(200).redirect('/blog');
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  const user = new userModel(null, null, email, password, null);
  const loginResponse = await user.loginUser();

  if (loginResponse.isValid === true){
    req.session.is_logged_in = loginResponse.isValid;
    req.session.id = loginResponse.id;
    req.session.username = loginResponse.username;
    req.session.email = loginResponse.email;
    req.session.is_admin = loginResponse.is_admin;
    res.status(200).redirect('/blog');
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;

