console.log('Loaded!');

//autoplay video background 
(function() {
  /**
   * Video element
   * @type {HTMLElement}
   */
  var video = document.getElementById("bgvideo");

  /**
   * Check if video can play, and play it
   */
  video.addEventListener( "canplay", function() {
    video.play();
  });
})();

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};


 var submit = document.getElementById('submit-btn');
var register = document.getElementById('register-btn');

submit.onclick = function(){
    
    var request = new XMLHttpRequest();

	request.onreadystatechange = function () {

		if(request.readyState === XMLHttpRequest.DONE){
			if (request.status === 200) {
				console.log('user logged in');
			    location.reload();
				alert('Logged in successfully');
			}else if (request.status === 403){
				alert('Username/Password is Invalid! Or Please Register.');
				document.getElementById('username').value='';
	            document.getElementById('password').value='';
			}else if (request.status === 500){
				alert('Something went wrong with our server.');
			}

		}

	};

	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;

	request.open('POST','http://dotarc.imad.hasura-app.io/login',true);   //dotarc.imad.hasura-app.io
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({username:username,password:password}));
};

register.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        	if(request.readyState === XMLHttpRequest.DONE){
			if (request.status === 200) {
				console.log('Thank you for registering.');
				alert('Thank you for registering.');
				document.getElementById('username').value='';
	            document.getElementById('password').value='';
			}else if (request.status === 403){
				alert('Registeration Unsuccessful.');
				document.getElementById('username').value='';
	            document.getElementById('password').value='';
			}else if (request.status === 500){
				alert('Something went wrong with our server.');
			}

		}
    };
    var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;

	request.open('POST','http://dotarc.imad.hasura-app.io/create-user',true);   //dotarc.imad.hasura-app.io
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({username:username,password:password}));
};

function checkLogin(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log(this.responseText);
                loadLoggedInUser(this.responseText);
               
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}
function loadArticles() {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!');
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}


function loadLoggedInUser(username){
    var logoutArea = document.getElementById('login_area');
    var loginForm = document.getElementById('login-form');
    loginForm.style.display = 'none';
   
    logoutArea.innerHTML = `
        <h6> Hi <i>${username}</i></h6>
        <a href="/logout">Logout</a>
    `;
}
checkLogin();
loadArticles();