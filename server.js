var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/ui/welcome.mp4', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'welcome.mp4'));
});

var blog ={
    title:'ARTICLE ONE | MUKESH S',
    heading:'Article one',
    date:'sept 30,2016',
    content:`
     <p>
                This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
            </p>
            <p>
                This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                </p>
                 <br/>
               <div><h2>Enter comments below :</h2></div>
             <textarea name='comment' class="commentbox" id='comment'></textarea>
             <div float:left> <input type="submit" id="comment_btn" value="Submit" class="btn btn-warning" >
              </div>
              <hr>
              <h4>Comments :</h4><br>
                <span id="comments"></span>`
              
} ;
function createtemplate (data) {
    var title=data.title;
    var heading= data.heading;
    var date=data.date;
    var content= data.content;
    
    var htmltemplate =`
    <html>
        <head>
            <link rel="icon" href="/ui/LOGO1.ico" >
            <title>
               ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" >
             <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <BODY>
           
                <div class="container">
                <h1>BLOG</h1>
              
                
                <div align="right"> 
                <a href="/home"><button  class="button1">HOME</button></a>
                 <a href="/Profile"><button  class="button2">PROFILE</button></a>
                 </div>
                 <hr>
            
            <h1>
                ${heading}
            </h1>
            <div>
                ${date}
            </div>
            <div>
                $(content)
            </div>
            </div>
             <script type="text/javascript" src="/ui/main.js" ></script>
        </BODY>
    </html>`;
    return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/UI/LOGO1.ico',function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'LOGO1.ico')); 
});

app.get('/home',function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'home.html')); 
});

app.get('/article-one',function(req,res) {
    res.sendFile(path.join(__dirname,'ui','article-one.html'));
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
