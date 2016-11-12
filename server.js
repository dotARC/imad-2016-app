var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool= require('pg').pool;
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

var pool = new Pool(config);

function createtemplate(data) {
    var title=data.title;
    var page=data.page;
    var heading= data.heading;
    var date= data.date;
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
                <h1>${page}</h1>
              
                
                <div align="right"> 
                <a href="/home"><button  class="button1">HOME</button></a>
                 <a href="/Profile"><button  class="button2">PROFILE</button></a>
                 </div>
                 <hr>
            
            <h1>
                ${heading}
            </h1>
            <div>${date.toDateString()}</div>
            <div>
                $(content)
            </div>
            </div>
            <h4>Comments</h4>
    
            <div id="comments">
             <center>Loading Comments..</center>
            </div>
            <div id="comment_form" ></div>
	
            </div>
             <script type="text/javascript" src="/ui/article.js" ></script>
        </BODY>
    </html>`;
    return htmltemplate;
}

app.get('/ui/welcome.mp4', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'welcome.mp4'));
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

app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.redirect('/');
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

//When not using database then creating end-point to handle articel request response
/*app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});*/

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
