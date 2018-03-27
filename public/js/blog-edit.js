// blog-editor.js

/*
Frontend JS for submitting new blog post to DB.
*/



const
	$ = require('jquery');



var blogEditor = {

	title: $('#blog-editor-title'),
	keywords: $('#blog-editor-keywords'),
	content: $('#blog-editor-content'),

	init: function() {

		blogEditor.events();  // setup events

	},

	events: function() {

		$('#blog-editor-submit').on('click', function() {

			var blogPost = {
				title: blogEditor.title.val(),
				keywords: blogEditor.keywords.val(),
				content: blogEditor.content.val()
			};

			// Make request to API..
			blogEditor.ajaxCall(blogPost);

		});

	},

	ajaxCall: function(blogPost) {
		
		$.ajax({
			type: "POST",
			url: '/api/blog',
			data: blogPost,
			dataType: 'json',
			contentType: 'application/json',
			success: function (results) {
				alert("blog post saved!");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("error creating blog post..");
			}
		});

	}

};



module.exports = blogEditor;