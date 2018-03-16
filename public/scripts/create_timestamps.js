// Make a list of timestamps for building the sensor plots frontend.
// sample data for 24 hours at 5 minute increment
// 24 hours = 1440 minutes --> 288 inc-minute increments

function get24HourData(minute_increment) {

	var timestamps = [];
	var date = '2015-08-07';
	var second = 0;
	var minute = 0;
	var hour = 0;

	var tot_seconds = (24 * 60 * 60) / minute_increment;

	for (var i = 0; i < tot_seconds; i++) {
		
		second = (minute_increment * i) % 60;
		
		if (second == 0 && i != 0) {
			minute += 1;
			minute = minute % 60;
			if (minute == 0) {
				hour += 1
			}
		}

		var stamp = minTwoDigits(hour) + ':' + minTwoDigits(minute) + ':' + minTwoDigits(second);
		timestamps[i] = stamp;

	}

	return timestamps;
}

function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}