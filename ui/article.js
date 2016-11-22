console.log('article.js');
var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm(){
	var commentForm = `
		<h4>Comments</h4>
		<textarea id="comment_text" type="text" rows="5" cols="50" placeholder="Write your comment here.." id="comment"></textarea>
		<br>
		<input type="submit" id="submit" value="Submit" class="btn btn-success"/>`;

		document.getElementById('comment_form').innerHTML = commentForm;

		var submit = document.getElementById('submit');

        submit.onclick = function(){
		    
			var request = new XMLHttpRequest();

			request.onreadystatechange = function () {
				if(request.readyState === XMLHttpRequest.DONE){
					if (request.status === 200) {
						document.getElementById('comment_text').value = '';
						loadComments();
					}else if(request.status === 403){
						alert("Please write a comment.");
					}else{
					    	alert("Error! Could submit your comments.Please try later.");
					}
					submit.value='Submit';
				}

			};
			var comment = document.getElementById('comment_text').value;

			request.open('POST','/submit-comment/'+currentArticleTitle,true);   
			request.setRequestHeader('Content-Type','application/json');
			request.send(JSON.stringify({comment:comment}));
			submit.value='Submitting..';

		}
}

function checkLogin(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);               
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadComments(){
	var request = new XMLHttpRequest();

			request.onreadystatechange = function () {
				var comments = document.getElementById('comments');
				if(request.readyState === XMLHttpRequest.DONE){
					if (request.status === 200) {
						var content = '';
						var commentsData = JSON.parse(this.responseText);
						for(var i=0;i<commentsData.length;i++){
							var time = new Date(commentsData[i].timestamp);
							content+=`<div class="comment">
								<p>${escapeHTML(commentsData[i].comment)}</p>
								<div class="commenter">
									${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()}
								</div>
								</div>`;
						}
						comments.innerHTML = content;
					}else{
						res.send('Oops! Could not load comments.');
					}
				}
			};

	request.open('GET', '/get-comments/'+currentArticleTitle, true);
	request.send(null);
}

checkLogin();
loadComments();