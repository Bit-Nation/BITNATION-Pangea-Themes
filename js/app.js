// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

(function($) {
	$('#menu-toggle').click(function(a, b, c) {
		$('#sidebar, #main').toggleClass('sidebarOffScreen');

		$('#sidebar ul li.sidebar-menu-item i.xbnx-icon').each(function(idx, el) {
			$(el).attr('data-tooltip', '');
		});

		$('#sidebar ul li.sidebar-menu-item i.xbnx-icon').hover(function(ev) {
			switch(ev.type) {
				case 'mouseenter':
					$(ev.target).attr('data-tooltip', '');
					break;
				case 'mouseleave':
					console.log($(ev.target));
					console.log('exit');
					break; 
			}
		});
	});
})(jQuery);
