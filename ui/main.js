console.log('Loaded!');

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
}

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

//return comment typed in comment box
var commentBtn = document.getElementById('comment_btn');
commentBtn.onclick = function (){
   var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
    console.log('comment is : ',comment);
    

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var comments = request.responseText;
                console.log('comments1 is : ',comments);
                comments = JSON.parse(comments);
                console.log('comments is : ',comments);
                var comment_list='';
                for(var i=0;i<comments.length;i++){
                    var t=i+1;
                    comment_list+='<p>'+'comment '+t+': '+comments[i]+'</p>'+ '<hr>' ;
                }
                var commentz = document.getElementById('comments');
                commentz.innerHTML = comment_list;
            }
            
        }

       
    };
   request.open('GET','http://dotarc.imad.hasura-app.io/submit_comment?comment='+comment,true);
   request.send(null);

};//button onclick function ends