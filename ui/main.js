

function blinkImg()
{
  var v, t, ele = document.getElementById("logo");
  if (ele.style.visibility == 'visible') {
    // hide it, then wait for imgOffTime
    v = 'hidden';
    t = imgOffTime;
  }
  else {
    // show it, then wait for imgOnTime
    v = 'visible';
    t = imgOnTime;
  }
  ele.style.visibility = v;
  setTimeout(blinkImg(),t);
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

