var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/omega3');

var Applicant = mongoose.model('Applicant', {
	name: String,
	bio: String,
	skills: String,
	years: Number,
	why: String
});

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {

	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	console.log(req.body);
	Applicant.find({}, function(err, data){
		console.log('Err: ', err);
		console.log('Data: ', data);
		res.render('applicants', {
			applicants: data
		});
	});
	
});

// creates and applicant
app.post('/applicant', function(req, res){
	var candidate = new Applicant({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why
	});
	candidate.save(function(err){
		if (err){
			console.log('Error!!');
		}
	});
	console.log(req.body);
	res.redirect('/success');
});
app.get('/success', function(req, res){
	res.render('success');
});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
