// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

(function($) {
	$('#menu-toggle').click(function(a, b, c) {
		$('#sidebar, #main').toggleClass('sidebarOffScreen');

		$('#sidebar ul li.sidebar-menu-item i.xbnx-icon').each(function(idx, el) {
			$(el).attr('data-tooltip', '');
		});
	});
})(jQuery);
