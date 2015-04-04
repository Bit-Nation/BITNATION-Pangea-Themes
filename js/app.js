// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

(function($) {
	$('#menu-toggle').click(function(a, b, c) {
		$('#sidebar, #main').toggleClass('sidebarOffScreen');
		$('#menu-toggle').toggleClass('fa-2x');
	});
})(jQuery);
