// +++++++ blog schema +++++++++

// var tempeh = {
//   'proj_name': 'tempeh',

//   'blog_desc': "A journey into tempeh cultivation",
//   'post_title': "First post for tempeh!",
//   'post_date': "10 October 2015",
//   'post_content': "",
  
//   'links': ['#new-batch', '#realtime-data', '#old-batches', '#tempeh-tales'],
//   'labels': ['new batch', 'realtime data', 'old batches', 'tempeh tales']
// };

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var blogSchema = new Schema({
  proj_name: { type: String, required: true }, // general name of sensor (e.g., grill temp, oyster hum, etc.)
  blog_desc: { type: String, required: false },
  post: [{
    date: { type: String, default: "00-00-00 00:00:00" },
    content: { type: String, default: "" }
  }]
});

// create model
var Blog = mongoose.model('Blog', blogSchema);

// make this available to our users in our Node applications
module.exports = Blog;