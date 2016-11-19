// Submit a comment
var commentbtn = document.getElementById('comment-button');
if (commentbtn !== undefined) {
commentbtn.onclick = function(){
    //Make request to server to send the comments
    var request1 = new XMLHttpRequest();
    request1.onreadystatechange = function (){
        if(request1.readyState===XMLHttpRequest.DONE){
            if(request1.status===200){
    //Store the comments and display on the page
    var comments = request1.responseText;
        comments = JSON.parse(comments);
        list_comment = '';
        for(var j = 0; j<comments.length;j++){
            list_comment += '<li>'+comments[j]+'</li>';
        }
            var ul1 = document.getElementById('commentlist');
            ul1.innerHTML = list_comment;
            }
        }
    };
    
   
    //Make request to capture the comment
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
     request1.open('GET','http://dotarc.imad.hasura-app.io/submit-comment?comment='+comment,true);
   //for local machine 

   request1.open('GET', window.location.protocol+'//'+window.location.host+'/submit-comment?comment='+comment, true);
   //for local machine 
   //request.open('GET',document.URL+'counter',true);
    request1.send(null);
};
}