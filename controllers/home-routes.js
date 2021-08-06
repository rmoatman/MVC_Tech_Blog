// I think I have to change the home-routes to get the blog data


const router = require('express').Router();
/* const { User } = require('../models'); */
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
//router.get('/', async (req, res) => {

  try {
    const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['username', 'ASC']],
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('homepage', {
      users,
      // // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(503).json(err);
  }

  router.get('/homepage', (req, res) => {
    // 
     if (req.session.logged_in) {
       res.render('homepage', {users,
      //   // // Pass the logged in flag to the template
      logged_in: req.session.logged_in,});
      return;
    }
  
    //res.render('login');
  });
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


module.exports = router;