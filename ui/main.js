
//autoplay video background 
(function() {
  /**
   * Video element
   * @type {HTMLElement}
   */
  var video = document.getElementById('bgvideo');

  /**
   * Check if video can play, and play it
   */
  
    video.play();
  
});


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


var submitlogin = document.getElementById('login_btn');
if (submitlogin !== undefined) {
submitlogin.onclick = function(){
    //make a request to server and send the names
     var request2 = new XMLHttpRequest();
    request2.onreadystatechange = function() {
      if(request2.readyState===XMLHttpRequest.DONE){
          if(request2.status===200){
            alert('Logged in succesfully');
    }
    else if(request2.status===403){
        alert('Username/Password incorrect');
    }
     else if(request2.status===500){
        alert('Something went wrong with the server');
    }
      }
          };
     var username = document.getElementById('username').value;//extrct from input
     var password = document.getElementById('password').value;
     console.log(username);
     console.log(password);
     request2.open('POST','http://dotarc.imad.hasura-app.io/login',true);
     request2.open('POST', window.location.protocol+'//'+window.location.host+'/login', true);
   //for local machine 
   //request.open('GET',document.URL+'counter',true);
     request2.setRequestHeader('Content-Type', 'application/json');
     request2.send(JSON.stringify({username: username, password: password}));  
};
}