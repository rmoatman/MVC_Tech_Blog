const homeFormHandler = (event) => {
    // Stop the browser from submitting the form
    console.log("homeFormHandler");
    console.log("Redirecting to homepage");
    window.location.replace("/");
};
      
  // Listens for Home button to be selected
  document
    .querySelector('#home-button')
    .addEventListener('click', homeFormHandler);


const dashboardFormHandler = (event) => {
    // Stop the browser from submitting the form
    console.log("dashboardFormHandler");
    console.log("Redirecting to dashboard");
    window.location.replace("/dashboard");
};
        
    // Listens for Home button to be selected
    document
    .querySelector('#dashboard-button')
    .addEventListener('click', dashboardFormHandler);
  