/******************************
  Random Quote Machine
  Michael Atkinson
******************************/

$(document).ready(function(){
	renderQuote(localQuote());
	$('#getQuote').click(generateQuote);
}); // end document.ready

function renderQuote(quote) {
/*
 * When passed a quote object with approporiate properties,
 * fades the quote in, updating the twitter text.
 * buttons are disabled and renabled after animations
*/
	$('.quoteBox button').prop('disabled', true);
	var a = $.Deferred();
	var b = $.Deferred();

	// display new quote
	$('#quote').fadeOut(function(){
		$(this).text(quote.quoteText).fadeIn(function() {a.resolve();});
	});
	$('#quotee').fadeOut(function(){
		$(this).text(quote.quoteAuthor).fadeIn(function() {b.resolve();});
	});

	// update twitter quote
	var newHref = 'https://twitter.com/intent/tweet?via=dubsta&text=';
	newHref += encodeURIComponent(quote.quoteText);
	if (quote.quoteAuthor !== '') { 
		newHref += ' - ' + encodeURIComponent(quote.quoteAuthor);
	}
	$('#twitterAnchor').attr('href', newHref);

	// enable buttons when animations are finished
	$.when(a, b).done(function() {
		$('.quoteBox button').prop('disabled', false);
	});
}

function generateQuote () {
/*
 * Attempts to get a new quote object from forismatic API by ajax
 * On success calls render on quote
 * On timeout calls render on a localquote
*/
	// disable buttons to be re-enabled in renderQuote()
	$('.quoteBox button').prop('disabled', true);

	var APIendpoint = 'http://api.forismatic.com/api/1.0/?jsonp=?'
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
		renderQuote(localQuote());
	};

	$.ajax({
    url: APIendpoint,
    data: URLqueryOptions,
    dataType: 'json',
    success: successCallback,
    error: failCallback,
    timeout : 1500
	});
}

function localQuote() {
/*
 * Returns a quote object from locally stored quotes
*/
	var localQuotes = 
	[
		{
			quoteText : "Believe you can and you're halfway there.",
			quoteAuthor : "Theodore Roosevelt"
		},
		{
			quoteText : "Do or do not, there is no try.",
			quoteAuthor : "Yoda"
		},
		{
			quoteText : "If things seem under control, you’re just not going fast enough.",
			quoteAuthor : "Mario Andretti"
		},
		{
			quoteText : "I do not fear computers. I fear the lack of them",
			quoteAuthor : "Isaac Asimov"
		},
		{
			quoteText : "I'll be back.",
			quoteAuthor : "Arnold Schwarznegger"
		},
		{
			quoteText : "I never said most of the things I said.",
			quoteAuthor : "Yogi Berra"
		},
		{
			quoteText : "All you need is love",
			quoteAuthor : "John Lennon"
		},
		{
			quoteText : "If I had nine hours to chop down a tree, I’d spend the first six sharpening my ax.",
			quoteAuthor : "Abraham Lincoln"
		}
	];
	var randomIndex = Math.floor(Math.random() * localQuotes.length);
	return localQuotes[randomIndex];
}
