//- This should ultimately be a part of the DB and not just a static object

var tempeh = {
	'proj_name': 'tempeh',

	'blog_desc': "A journey into tempeh cultivation",
	'post_title': "First post for tempeh!",
	'post_date': "10 October 2015",
	'post_content': "",
	
	'links': ['#new-batch', '#realtime-data', '#old-batches', '#tempeh-tales'],
	'labels': ['new batch', 'realtime data', 'old batches', 'tempeh tales']
};

var beers = {
	'proj_name': 'beers',
	'links': ['#new-batch', '#realtime-data', '#old-batches', '#beer-tales'],
	'labels': ['new batch', 'realtime data', 'old batches', 'beer tales']
};

var projects = {
	'tempeh': tempeh,
	'beers': beers
};

// module.exports = tempeh;
module.exports = projects;