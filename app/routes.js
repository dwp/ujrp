var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

router.all('/find-work/results', function(req, res) {
  var fs = require('fs');
  var data = fs.readFileSync(__dirname + '/assets/data/jobs.json', 'utf-8');
      data = JSON.parse(data);

  res.render('find-work/results', {jobs: data.jobs});
});

router.get('/find-work/job', function(req, res) {
  var fs = require('fs');
  var data = fs.readFileSync(__dirname + '/assets/data/jobs.json', 'utf-8');
      data = JSON.parse(data);

  res.render('find-work/job', {job: data.jobs[0]});
});

// Example route: Passing data into a page
router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name' : 'Foo' });
});

// add your routes here

module.exports = router;
