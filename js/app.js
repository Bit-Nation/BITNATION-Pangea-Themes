// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(function() {
	$('#menu-toggle').click(function() {
		$('#sidebar').toggle();
		$('.dapp-selector .option').height('80%');
	});
});
