$(document).ready(function() {

	$('[data-toggle="tooltip"]').tooltip();  // initialize pretty tooltips

	var ip, port;
	// $('head').append('<script src="../../settings.js"></script>');
	// var local_settings = require('')
	// ip = settings['IP'];
	// port = settings['PORT'];
	// ip = '192.168.1.2';
	ip = 'localhost';
	port = '8000';

	// $('.sensor-btn').click(function () {
	// 	//Carousel attempt, take 2:
		// $('#slideshow').slick({
		// 	dots: true,
		// 	infinite: true,
		// 	speed: 500,
		// 	fade: false,
		// 	cssEase: 'linear'
		// });
	// });

	var socket = io.connect('http://' + ip + ':' + port);

	socket.on('connect', function (data) {
	  	console.log("client connected");
	});


	// Start button timer event:
	$('#start-btn').on('click', function() { 

		var delay = parseFloat($('#data-interval').val()); // convert to float
		var current_time = new Date();
		var hours = current_time.getHours() < 10 ? "0" + current_time.getHours() : current_time.getHours();
        var minutes = current_time.getMinutes() < 10 ? "0" + current_time.getMinutes() : current_time.getMinutes();
        var seconds = current_time.getSeconds() < 10 ? "0" + current_time.getSeconds() : current_time.getSeconds();
		$('h3#start-time').html(hours + 
								':' + minutes +
								':' + seconds);

		// check collection interval before starting:
		if (valueInRange(1, 30, delay)) {
			$('div.error-msg').css('display', 'none');
			socket.emit('serial', true); // send 'serial' event to server
			socket.emit('delay', delay); // send delay to server
			socket.on('data', function (data) {
				$('h3#temp-val').html(data['data'] + '&deg;F'); // display current data on page
				GetData(data); // plot data (flot plot stuff)
			});
		}
		else {
			// display error message:
			$('div.error-msg').css('display', 'inline');
		}

	});

	$('#stop-btn').on('click', function() {
		socket.emit('serial', false); // stop serial read
		var current_time = new Date();
		var hours = current_time.getHours() < 10 ? "0" + current_time.getHours() : current_time.getHours();
        var minutes = current_time.getMinutes() < 10 ? "0" + current_time.getMinutes() : current_time.getMinutes();
        var seconds = current_time.getSeconds() < 10 ? "0" + current_time.getSeconds() : current_time.getSeconds();
		$('h3#end-time').html(hours + 
								':' + minutes +
								':' + seconds);
	});


	function convertToSeconds(delay, units) {
		console.log("units = " + units);
		console.log("delay = " + delay);

		var delay_seconds;

		if (units === "hours") {
			delay_seconds = 60 * 60 * delay;
		}
		else if (units === "minutes") {
			delay_seconds = 60 * delay;
		}
		else if (units === "seconds") {
			delay_seconds = delay;
		}
		else {
			delay_seconds = null;
		}
		return delay_seconds;
	}


	function valueInRange(min, max, val) {
		if (val < min || val > max) { return false; }
		else { return true; }
	}

});


// FIREFOX BUG FIX???
// $(window).on('beforeunload', function() {
// 	socket.close();
// });