var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool= require('pg').pool;



var app = express();
app.use(morgan('combined'));

var config = {
    user: 'dotarc',
    database: 'dotarc',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
 
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


var pool = new Pool(config);

app.get('/:articleName', function (req, res) {

	var articleName = req.params.articleName;

	pool.query('SELECT * FROM article WHERE title=$1',[articleName],function(err,result){
		if(err){
           res.status(500).send(err.toString());
       }else{
           if(result.rows.length === 0){
           	res.status(404).send('Article Not Found.');
           }else{
                var articleData = result.rows[0];
           	res.send(createTemplate(articleData));
           }
       }
	});
});


app.get('/test-db',function(err,res){
   
   pool.query('SELECT * FROM test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result.rows));
       }
   });
});

app.get('/ui/welcome.mp4', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'welcome.mp4'));
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
