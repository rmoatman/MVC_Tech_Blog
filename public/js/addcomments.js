const commentFormHandler = async (event) => {
    // Stop the browser from submitting the form
    console.log("Hello");
    event.preventDefault();


  
    // 
    const commentText = document.querySelector('#new_comment').value.trim();

    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

      const response = await fetch('/comment', {
        method: 'POST',
        body: JSON.stringify({
            commentText,
            blog_id
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If credentials are saved, sign user in and redirect to homepage
        //   if (response.ok) {
        //     document.location.reload();
      // }
};
  
  // Listens for returning user to select Submit
  document
    .querySelector('#comment-card')
    .addEventListener('click', commentFormHandler);
  