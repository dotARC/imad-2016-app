//autoplay video background 
(function() {
 
  var video = document.getElementById('bgvideo');

  
    video.play();
  
});


function glow()
{   
    if(i<0){
    document.getElementById('logo').style.opacity=i;
    i=i+0.1;
    setTimeout(glow,100);
    
    }
   
}
function glowagain()
{
    if(i>0)
    {
      document.getElementById('logo').style.opacity=i;
    i=i-0.1;
    setTimeout(glowagain,100);
    
    }
    
}

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

