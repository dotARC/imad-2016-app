var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html')); 
});

var comments=[];
app.get('/submit_comment',function(req,res){
    //to get the comments
 var comment=req.query.comment;
 comments.push(comment);
 console.log('comments is: ',comments);
 res.send(JSON.stringify(comments));

    //to render those comments on the page
});


app.get('/profile',function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'Profile.html')); 
});

app.get('/ui/welcome.mp4', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'welcome.mp4'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js',function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'main.js')); 
});

app.get('/ui/black-thread.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'black-thread.png'));
});

app.get('/ui/LOGO1.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'LOGO1.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
