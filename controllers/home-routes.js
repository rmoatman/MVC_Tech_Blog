const router = require('express').Router();
const {User, Blog } = require('../models');


// Case: /.  Redirects to /login if not logged in or to /hompage if session exists. (use withAuth in /utils/helpers)
router.get('/', async (req, res) => {

   try {

    const blogData = await Blog.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'comment'
      ],
      include: {
        model: User,
        attributes: ['username']
      }
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(503).json(err);
  }
}); // end Case: /.




// Case:  User tries /login
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // If directed to login, then listeners in login.js are called
  res.render('login');
}); // end Case:  User tries /login




module.exports = router;
