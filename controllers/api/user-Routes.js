const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log("Are we getting here?")
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ 
      where: {
        email: req.body.email
      }
    });
    console.log("Are we getting here?1")
    
    if (!userData) {
      console.log("Are we getting here?5")
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);
    console.log("Are we getting here?2")
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    console.log("Are we getting here?3");
    //Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log("Are we getting here?4");
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
        console.log("We are here!");
        return;
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  console.log("Where now?");
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
