var express = require('express');
const passport = require('passport');
var userModel = require("./users")
var router = express.Router();
var postModel = require("./post");

const localStrategy = require("passport-local");
const upload = require('./multer');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render("login", { error: req.flash('error') });
});

router.post("/jjp", upload.single("image"), async function (req, res) {

  var user = await userModel.findOne({ username: req.session.passport.user });
  user.profileImage = req.file.filename;
  await user.save();

  req.flash('uploaded', "uploaded");
  res.redirect('/profile')



});


router.post("/ep", upload.single("image"),isLoggedIn, async function (req, res) {

  var user = await userModel.findOne({ username: req.session.passport.user });
  user.profileImage = req.file.filename;
  await user.save();

  req.flash('uploaded', "uploaded");
  res.redirect('/edit')



});






router.post("/register", function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    email:req.body.email,
    secret:"Subhajitlaisanjana",
    name: req.body.name
  });
  userModel.register(userdata, req.body.password).then(function (registereduser) {

    passport.authenticate("local")(req, res, function () {
      res.redirect('/profile');
    })
  })

});


router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true

}), function (req, res) { })




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}



router.get('/signup', function (req, res, next) {

  res.render("register");
});





router.get('/feed', isLoggedIn, async function (req, res, next) {

  var posts = await postModel.find().populate("user");

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  var suffel = shuffleArray(posts);


  console.log(posts);
  res.render("feed", { posts: suffel });
});





router.get('/profile', isLoggedIn, async function (req, res, next) {
  var user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");
  console.log(Date.now());
  // res.send(user.profileImage);







  var success = req.flash("uploaded");
  if (success.length > 0) {


    res.render("profile", { user: user, success: true });
  }
  else
    res.render("profile", { user: user, success: false });
});

router.get("/newpost", isLoggedIn, async function (req, res) {
  var user = await userModel.findOne({ username: req.session.passport.user });
  res.render("newpost", { user: user });
});
router.get("/edit", isLoggedIn, async function (req, res) {
  var user = await userModel.findOne({ username: req.session.passport.user });
  res.render("editprofile", { user: user });
});
router.post("/createpost", isLoggedIn, upload.single("postimg"), async function (req, res) {
  var user = await userModel.findOne({ username: req.session.passport.user });

  var post = await postModel.create({

    user: user._id,
    caption: req.body.caption,
    image: req.file.filename


  });


  user.posts.push(post._id);
  await user.save();
  await post.save();
  res.redirect("/profile");
});




router.post("/updateuser", isLoggedIn, async function (req, res) {



  if(req.body.email.length > 0 && req.body.name.length>0 ){
    var newuser = await userModel.findOneAndUpdate({ username: req.session.passport.user }, { name: req.body.name, email: req.body.email }, { new: true });
  } 
  else if(req.body.email.length > 0  ){
    var newuser = await userModel.findOneAndUpdate({ username: req.session.passport.user }, {  email: req.body.email }, { new: true });
  }
  else if(req.body.name.length > 0  ){
    var newuser = await userModel.findOneAndUpdate({ username: req.session.passport.user }, {   name: req.body.name,}, { new: true });
  }

 

  console.log(newuser);


  res.redirect("/profile");


});



module.exports = router;
