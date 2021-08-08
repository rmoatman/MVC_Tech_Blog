const commentFormHandler = async (event) => {
    // Stop the browser from submitting the form
    console.log("commentFormHandler");
    event.preventDefault();

    // Gather the information from the form element on the page
    const commentText = document.querySelector('#new_comment').value.trim();
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (commentText) {
        console.log("----------------------------------------");
        console.log("Comments exists, pressed submit");
        console.log("Go to router.post/comment in home-routes");
        console.log("How can I refresh the page?")
        console.log("----------------------------------------");
        const response = fetch('/comment', {
            method: 'POST',
            body: JSON.stringify({
                commentText,
                blog_id
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        // Get here but won't reload
        console.log("Redirecting to homepage");
        window.location.replace("/");



  
    } else {
        console.log("no comment");
        alert('Failed to create comment');
    }
    
};
  
  // Listens for returning user to select Submit
  document
    .querySelector('#comment-card')
    .addEventListener('click', commentFormHandler);
  