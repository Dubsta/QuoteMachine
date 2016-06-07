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
	$('.quoteBox button').prop('disabled', true);
	var a = $.Deferred();
	var b = $.Deferred();

	// display new quote
	$('#quote').fadeOut(function(){
		$(this).text(data.quoteText).fadeIn(function() {a.resolve();});
	});
	$('#quotee').fadeOut(function(){
		$(this).text(data.quoteAuthor).fadeIn(function() {b.resolve();});
	});

	// update twitter quote
	var newHref = 'https://twitter.com/intent/tweet?via=dubsta&text=';
	newHref += data.quoteText;
	if (data.quoteAuthor !== '') { 
		newHref += ' - ' + data.quoteAuthor;
	}
	$('#twitterAnchor').attr('href', newHref);

	// enable buttons when animations are finished
	$.when(a, b).done(function() {
		$('.quoteBox button').prop('disabled', false);
	});
}

function generateQuote () {

	$('.quoteBox button').prop('disabled', true);

	// ajax
	var APIendpoint = 'http://api.forismatic.com/api/1.5/?jsonp=?'
	var URLqueryOptions = {
		lang : 'en',
		method : 'getQuote',
		format : 'jsonp',
	};
	var successCallback = function (data, status) {
		console.log('The status is ' + status);
		renderQuote(data);		
	};
	var failCallback = function (data, status, error) {
		console.log("Looks like an error");
		console.log(data.status + "  " + error);
		useLocalQuote();
	};

	$.ajax({
    url: APIendpoint,
    data: URLqueryOptions,
    dataType: 'json',
    success: successCallback,
    error: failCallback,
    timeout : 2500
	});
	// end ajax
}

function useLocalQuote() {
	// uses object localQuotes from another script
	var randomIndex = Math.floor(Math.random() * localQuotes.length);
	renderQuote(localQuotes[randomIndex]);
}
