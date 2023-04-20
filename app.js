//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const homeStartingContent = "Welcome to Home Page";
const aboutContent = "Welcome to About Page";
const contactContent = "Welcome to Contact Page";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts=[];


app.get("/",function(req,res)
{
  res.render("home",{ startingContent : homeStartingContent,
    posts:posts
  });
})

app.get("/about",function(req,res)
{
  res.render("about",{ allAbout : aboutContent});
})

app.get("/contact",function(req,res)
{
  res.render("contact",{ allContact : contactContent});
})
app.get("/compose",function(req,res)
{
  res.render("compose");
})


app.get("/posts/:topic",function(req,res)
{
  var reqTitle=_.lowerCase(req.params.topic);
  posts.forEach(function(post)
  {
    const storeTitle=_.lowerCase(post.title);
    if(storeTitle===reqTitle)
    {
      res.render("post",{
        title: post.title,
        content: post.content
      });
    }
  })
})
app.post("/compose",function(req,res)
{
  const post ={
    title: req.body.posttitle ,
    content: req.body.postBody 
    };

    posts.push(post);
    res.redirect("/");
})
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
