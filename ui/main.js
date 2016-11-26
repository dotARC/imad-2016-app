
function blinkId(logo) {
	var i = document.getElementById(logo);
	if(i.style.visibility=='hidden') {
		i.style.visibility='visible';
	} else {
		i.style.visibility='hidden';
	}
    setTimeout("blinkId('"+logo+"')",1000);
	return true;
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

