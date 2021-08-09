const router = require('express').Router();
const { response } = require('express');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');



// HOMEPAGE IF LOGGED IN
router.get('/', withAuth, async (req, res) => {

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
        {model: Comment, attributes: ['comment_text']},
      ]
      });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // console.log("Blogs data");
    // console.log(blogs);
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,

    });
    //console.log(req.session.logged_in);

  } catch (err) {
    res.status(503).json(err);
  }
}); // end HOMEPAGE /.


// SINGLE POST
router.get('/postpage/:id', withAuth, async (req, res) => {
  // console.log("req.params.id");
  // console.log(req.params.id);
  console.log("-----------------------------------------");
  console.log("home-routes.js:  router.get /postpage/:id");
  console.log("From home page, select single post");
  console.log("-----------------------------------------");

  try {
    const postData = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['comment_text']}
       ],
    });

    // console.log(postData);
    const post = postData.get({ plain: true });
    // console.log(post);

    res.render('postpage', {
      post,
      logged_in: req.session.logged_in

    });
    // console.log(req.session.logged_in);

  } catch (err) {
    res.status(404).json({ message: 'No post found with that ID.' });
  }
}); // end of SINGLE POST

// NEW COMMENT VIEW (from home-routes.js)
router.get('/newcomment/:id', withAuth, async (req, res) => {
  console.log("-------------------------------------------");
  console.log("home-routes.js:  router.get /newcomment/:id");
  console.log("From post page, pressed add new comment");
  console.log("-------------------------------------------");

  try {
    const postData = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['comment_text']}
       ],
    });

    const post = postData.get({ plain: true });

    res.render('newcomment', {
      post,
      logged_in: req.session.logged_in

    });
    // console.log(req.session.logged_in);

  } catch (err) {
    res.status(404).json({ message: 'No post found with that ID.' });
  }
}); // end NEW COMMENT VIEW


// POST NEW COMMENT (sent here from addcomments.js)
router.post('/comment', withAuth, async (req, res) => {

  if(req.session) {

    Comment.create ({
      blog_id: req.body.blog_id,
      comment_text: req.body.commentText,
      user_id: req.session.user_id,
    })

    console.log("------------------------------------");
    console.log("home-routes.js: router.post /comment");
    console.log("Comment has been posted");
    console.log("------------------------------------");

  } else (err => {
        console.log(err)
        res.status(400).json.user_id(err);
    })
  
});

// Case: /dashboard.
router.get('/dashboard', withAuth, async (req, res) => {
  //console.log("req.session.logged)in");
  //console.log(req.session.user_id);
  try {
    
   const blogData = await Blog.findAll({
     where: { username_id: req.session.user_id },
    
      attributes: [
       'id',
       'date',
       'title',
       'content'
     ],

     include: [
       {model: User, attributes: [ 'id', 'username']},
       {model: Comment, attributes: ['comment_text']},
     ]
  });

   const blogs = blogData.map((blog) => blog.get({ plain: true }));

   res.render('dashboard', {
     blogs,
     logged_in: req.session.logged_in,

   });

 } catch (err) {
   res.status(503).json(err);
 }
}); // end POST NEW COMMENT


// DELETE SINGLE POST
router.get('/deletepost/:id', withAuth,  async (req, res) => {
  console.log("-----------------------------------------");
  console.log("home-routes.js:  router.get /deletepage/:id");
  console.log("From dashboard, delete button");
  console.log("-----------------------------------------");

 await Blog.destroy({
      where: { id: req.params.id },
    });

    console.log("deleted");

// destroys but does not refresh. GET/DESTROY conflict?

    //res.render('homepage');

    const blogData = await Blog.findAll({
      attributes: [
        'id',
        'date',
        'title',
        'content'
      ],

      include: [
        {model: User, attributes: ['username']},
        {model: Comment, attributes: ['comment_text']},
      ]
      });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // console.log("Blogs data");
    // console.log(blogs);
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    })

}); // end DELETE SINGLE POST



// LOGIN
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
