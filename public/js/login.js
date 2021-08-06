// Action taken when Submit button is selected
const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form 
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    console.log("email and password");
    // Send the e-mail and password to the server (user-Routes)
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If user exists, sign them in and redirect to homepage (home-Routes)
    if (response.ok) {
////// why do I need a prompt for the replace to happen on the first try?
      //prompt("Please hit ok to continue");
      document.location.replace('/');

    } else {
      alert('Failed to log in');
    }
  }
};

// Action taken when Signup button is selected
const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form
  event.preventDefault();

  // Send the e-mail and password to the server
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    // If user credentials are complete, save credentials to the user_db
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If credentials are saved, sign user in and redirect to homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// Listens for returning user to select Login
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Listens for new user to select Signup
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

