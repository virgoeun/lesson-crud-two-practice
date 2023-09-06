const router = require("express").Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");

// ****************************************************************************************
// GET route to display the form to create a new post
// ****************************************************************************************

// localhost:3000/post-create
router.get("/post-create", (req, res) => {
  User.find()
    .then((dbUsers) => {
      res.render("posts/create", { dbUsers });
    })
    .catch((err) => console.log(`Err while displaying post input page: ${err}`));
});

// ****************************************************************************************
// POST route to submit the form to create a post
// ****************************************************************************************

router.post("/post-create", (req, res) => {

const {title, content, autho} = req.body;

Post.create({title, content, author})
.then (dbPost => {
return User.findByIdAndUpdate(author, {$push: {posts: dbPost_id}} )
.then(() => res.redirect('/posts'))
.catch ((err) => next (err));
})

// all list 
router.get("/posts", (req, res, next) => {
Post.find()
.populate('author')
.then (dbPosts => {
  res.render('posts/list', {posts: dbPosts})
})
.catch ( err => next(err));

})


//single post details
router.get("/posts/:postId", (req, res) => {

const {postId} = req.params;

Post.findById(postId)
.populat('author')
.then (foundPost => res.render('posts/details', foundPost))
.catch ( err => next(err));

})

})

//all posts by one single user


// ****************************************************************************************
// GET route to display all the posts
// ****************************************************************************************

router.get('/posts/:postId', (req, res) => {

  const{postId} = req.params;

  Post.findById(postId)
  .populate('author comments')
  .populate ({
    path: 'comments',
    populate: {
      path:'author',
      model: 'user'
    }
  })
  .then(foundPost => res.render('posts/details', foundPost))
  .catch(err => {
    console.log(`Err while getting a single post from the  DB: ${err}`);
    next(err);
  });
  


})

// ****************************************************************************************
// GET route for displaying the post details page
// shows how to deep populate (populate the populated field)
// ****************************************************************************************

// ... your code here

module.exports = router;
