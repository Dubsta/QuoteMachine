/*
Look up and load new quotes.

 - Lookup new random quotes using forismatic API found here:
 	http://forismatic.com/en/api/	
 - If API call fails, get a random quote from a small local database
 - Load quote into the page using jquery
*/

$(document).ready(function(){
	useLocalQuote();
	$('#getQuote').click(generateQuote);
}); // end document.ready

function renderQuote(data) {
	// display new quote
	$('#quote').fadeOut(function(){
		$(this).text(data.quoteText).fadeIn();
	});
	$('#quotee').fadeOut(function(){
		$(this).text(data.quoteAuthor).fadeIn();
	});

	// update twitter quote
	var newHref = 'https://twitter.com/intent/tweet?via=dubsta&text=';
	newHref += data.quoteText;
	if (data.quoteAuthor !== '') { 
		newHref += ' - ' + data.quoteAuthor;
	}	
	$('#twitterAnchor').attr('href', newHref);

	// enable buttons
	$('.quoteBox button').prop('disabled', false);
}

function generateQuote () {

	$('.quoteBox button').prop('disabled', true);

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

function useLocalQuote() {
	// uses object localQuotes from another script
	var randomIndex = Math.floor(Math.random() * localQuotes.length);
	renderQuote(localQuotes[randomIndex]);
}
