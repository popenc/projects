// display the right div when clicked on left hand side
$(document).ready(function () {
	$('a.project-btn').click(function () {
		var btn_id = $(this).attr('id').replace('#', '');
		var option_div = $('div#' + btn_id);
		$('div.project-option').hide(); // hide all divs
		$(option_div).show(); // show selected div
	});
});