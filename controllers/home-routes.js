const router = require('express').Router();
const { User, Blog, Comment } = require('../models');


// Case: /.  Redirects to /login if not logged in or to /hompage if session exists. (use withAuth in /utils/helpers)
router.get('/', async (req, res) => {

   try {

    const blogData = await Blog.findAll({
      attributes: [
        'id',
        'date',
        'title',
        'content'
      ],

      include: [
        {model: User, attributes: ['username']},
      ]
      });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log("Blogs data");
    console.log(blogs);
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(503).json(err);
  }
}); // end Case: /.

// Case:  User selects a single post
router.get('/postpage/:id', async (req, res) => {
  console.log("req.params.id");
  console.log(req.params.id);

  try {
    const postData = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['comment_text', 'user_id', 'blog_id'],
          /* include: [{ model: User, attributes: ['username'] }] */
        },
      ],
    });

    console.log(postData);
    const post = postData.get({ plain: true });
    console.log(post);

    res.render('postpage', {
      post,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    res.status(404).json({ message: 'No post found with that ID.' });
  }
});
























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
