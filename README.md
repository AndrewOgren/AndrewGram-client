# lab4-AndrewOgren

## Blog
I made a site where you can add posts with a title, tags, content, and a cover image or gif. The Redux worked really well as well as the axios calls
which allowed me to store the posts and fetch them when necessary. I chose to make a NewPost, Post, and Posts component, and I kept the App and Navbar
in the main index.js file, since they're very small dumb components with no state. The part that I struggled the most with was the inline-editing, since
I needed to devise a way to make sure to know which part of the post was being edited, and I had to save the new information when the user was
done editing.

## Extra Credit
I added input validation. I check to make sure each input is filled out, and if one of them is not filled out, I display an appropriate error message. I installed react-alert, which provides "toasts" like on an Android phone. Then I further styled those toasts. 

