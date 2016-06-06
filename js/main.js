/*
Look up and load new quotes.

 - Lookup new random quotes using forismatic API found here:
 	http://forismatic.com/en/api/	
 - If API call fails, get a random quote from a small local database
 - Load quote into the page using jquery
*/

$(document).ready(function(){
	$('#getQuote').click(quoteFromAPI);
}); // end document.ready

function renderQuote(data) {
	$('#quote').fadeOut(function(){
		$(this).text(data.quoteText).fadeIn();
	});
	$('#quotee').fadeOut(function(){
		$(this).text(data.quoteAuthor).fadeIn();
	});
}

function quoteFromAPI () {
	var APIendpoint = 'http://api.forismatic.com/api/1.0/?jsonp=?'
	var options = {
		lang : 'en',
		method : 'getQuote',
		format : 'jsonp',
	};
	function callback (data, status, jrXHR) {
		console.log('The status is ' + status);
		renderQuote(data);		
	}

	$.getJSON(APIendpoint, options, callback);
}
