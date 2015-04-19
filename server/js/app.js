// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

(function($) {
	$('#menu-toggle').click(function(ev) {
		$('#sidebar, #main').toggleClass('sidebarOffScreen');
		$(ev.target).toggleClass('fa-2x');
	});
})(jQuery);
