const btn = document.querySelector('#btn');  
const sb = document.querySelector('#subject');

btn.onclick = (event) =>  
{  
  event.preventDefault();
  let subject = sb.value;
  /* check of the input */
  if (subject == "") {
	alert("you have to write a topic");
	return false;
  } else if(subject.indexOf(' ') >= 0){
	alert("contains spaces");
	return false;
  }
  
  /* AXIOS */
// here I make the request
  axios.get('https://openlibrary.org/search.json?subject=' + subject + '&limit=20&offset=0')
  .then(function (response) {
	// here I handle the success
	let objectBooks = response.data;
	let books =  objectBooks.docs;
	if (books.length != 0) {
	  document.getElementById("more-details").innerHTML = "click on the book you are interested in to get more details";
	  for (let i=0; i < books.length; i++) {
	  document.getElementById("output-info").innerHTML += "<div class='one-book'>" + "TITLE: " + books[i].title + "<br><br>AUTHOR: " + books[i].author_name + "</div>";          
		
		//add event listener for the book clicked
		const xx = document.getElementsByClassName("one-book");
		for (let ii=0; ii < xx.length; ii++) {
		  xx[ii].addEventListener('click', event=> {
			axios.get('https://openlibrary.org' + books[ii].key + '.json')
			.then(function (response) {
			  // here I handle the success
			  let objectBookChosen = response.data;
			  let myDescritpion = "";
			  if (typeof(objectBookChosen.description) == "object") {
				myDescritpion = objectBookChosen.description.value;
				} else {
				myDescritpion = objectBookChosen.description
				}
				if (typeof myDescritpion == "undefined") {
				  myDescritpion = "book without description in the archive of openlibrary.org"
				}
				document.getElementById("btn").remove();
				document.getElementById("subject").remove();
				document.getElementById("myLabel").remove();
				document.getElementById("chosen-book").innerHTML += "<div class='one-book'>" + "TITLE: " + books[i].title + "<br><br>AUTHOR: " + books[i].author_name + "</div>";
				document.getElementById("description").innerHTML = "DESCRIPTION OF THE BOOK:<BR><br>" + myDescritpion + "<br><button id='new-search'>New Search</button>";
				document.getElementById("new-search").addEventListener("click", function(){ 
				  location.href = "index.html";
				  });
			})
			.catch(function (error) {
			  // here I handle the error
			  console.log(error);
			})
		  });
		}
	  }
	} else {
	document.getElementById("output-empty").innerHTML = "No Book Found With This Topic";
	}
  })
  .catch(function (error) {
	// here I handle the error
	console.log(error);
  })
};
