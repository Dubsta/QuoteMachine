/*
Look up and load new quotes.

 - Lookup new random quotes using forismatic API found here:
 	http://forismatic.com/en/api/	
 - If API call fails, get a random quote from a small local database
 - Load quote into the page using jquery
*/


function quoteFromAPI () {
	var APIendpoint = 'http://api.forismatic.com/api/1.0/?jsonp=?'
	var options = {
		lang : "en",
		method : "getQuote",
		format : "jsonp",
	};
	function callback (data, status, jrXHR) {
		console.log("The status is " + status);
		console.log("The quote is: " + data.quoteText);
	}

	$.getJSON(APIendpoint, options, callback);
}

quoteFromAPI();