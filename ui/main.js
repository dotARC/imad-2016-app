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


 var submitButton = document.getElementById('submit_btn');
submitButton.onclick = function(){
    var request = new XMLHttpRequest();

    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE && request.status === 200){
            var data = request.responseText;
            console.log(data);
        }
    };


    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    request.open('POST','http://dotarc.imad.hasura-app.io/create-user',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};
  
  
  


