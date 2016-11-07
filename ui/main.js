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
}

var counter=0;
   
    var button = document.getElementById('submit_btn');
    button.onclick = function(){
    	 //counter=counter+1; this was just client side without visiting server
    	 
    	 //this is requesting server for information
    	 //Making a request to counter endpoint
    	 //Create request object
    	 var request = new XMLHttpRequest();
         var nameInput = document.getElementById('name');
         var name=nameInput.value;
         console.log('name is: ',name);
    	 //Capture the response and store it in a variable
    	 request.onreadystatechange = function(){
    	 	if(request.readyState === XMLHttpRequest.DONE){
    	 		//take some action
    	 		if(request.status ===200){
    	 			var names=request.responseText;//this gets a string
                    console.log('names1 is: ',names);
                    names = JSON.parse(names); //converting string to array
                    console.log('names is: ',names);
                    var list='';
                    for(var i=0;i<names.length;i++){
                    list=list +'<li>'+names[i]+"</li>";
                    console.log('list is: ',list);
                    }
            var ul = document.getElementById('namelist');
            ul.innerHTML = list;
    	 		}
    	 	}
    	 
    	 	
    	 };//button onclick function ends

    	 //Make the request
    	 request.open('GET','http://dotarc.imad.hasura-app.io/submit-name?name='+name,true);
    	 request.send(null);
    	
    }; //button onclick function ends
    
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


  