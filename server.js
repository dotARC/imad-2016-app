var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'dotarc',
    database: 'dotarc',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));


function createTemplate (data) {
    var title = data.title;
    var page = data.page;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
      <head>
          <title>
              ${title}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/ui/style.css" rel="stylesheet" />
      </head> 
      <body>
          <div class="container">
               <h1>${page}</h1> 
             <div align="right"> 
                <a href="/home"><button  class="button1">HOME</button></a>
                 <a href="/Profile"><button  class="button2">PROFILE</button></a>
                 </div>
              <hr/>
              <h3>
                  ${heading}
              </h3>
              <div>
                  ${date.toDateString()}
              </div>
              <div>
                ${content}
              </div>
              <hr/>
               <label>Enter comments below</label></br>
             <textarea name='comment' id='comment'></textarea><br />
              <input type="submit" id="comment_btn" value="Submit" class="btn btn-warning"></input>
              <hr>
              <p>Comments :<br>
                <span id="comments"></span>
              </p>
            <br>
            <hr>
          </div>
          <script type="text/javascript" src="/ui/article.js"></script>
      </body>
    </html>
    `;
    return htmlTemplate;
}


app.get('/ui/welcome.mp4', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'welcome.mp4'));
});

var pool = new Pool(config);


app.get('/test-db',function(err,res){
   
   pool.query('SELECT * FROM test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result.rows));
       }
   });
});

function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});



app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});



app.get('/article/:articleName', function (req, res) {
  // SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var article = result.rows[0];
            res.send(createTemplate(article));
        }
    }
  });
});

app.post('/create-user',function(req,res){
  //take username and password as input and create entry in user table
  
  var username = req.body.username;
  var password = req.body.password;
  var salt= crypto.randomBytes(128).toString('hex');
  var dbString = hash(password,salt);
  
  
  pool.query('INSERT INTO "user"(username,password) VALUES($1,$2)',[username,dbString],function(err,result){
    if(err){
      res.status(500).send(err.toString());

    }else{
      res.send('user succesfully created');
    }
  });
});

var comments=[];
app.get('/submit_comment',function(req,res){
    //to get the comments
 var comment=req.query.comment;
 comments.push(comment);
 res.send(JSON.stringify(comments));

    //to render those comments on the page
});

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/UI/LOGO1.ico',function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'LOGO1.ico')); 
});

app.get('/home',function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'home.html')); 
});


app.get('/profile',function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'Profile.html')); 
});

//When not using database then creating end-point to handle article request response
/*app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(article[articleName]));
});*/

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js',function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'main.js')); 
});

app.get('/ui/article.js',function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'article.js')); 
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
