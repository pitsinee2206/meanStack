// modules =================================================
const express = require('express');
const app = express();
var mongoose = require('mongoose');
// set our port
const port = 3000;
// configuration ===========================================
app.use(express.json());
// config files
var db = require('./config/db');
console.log("connecting--",db);
mongoose.connect(db.url); //Mongoose connection created

// frontend routes =========================================================
app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

//defining route
app.get('/tproute', function (req, res) {
   res.send('This is routing for the application developed using Node and Express...');
});

// sample api route
// grab the student model we just created
var Student = require('./app/models/students');
app.get('/api/students', function(req, res) {
   // use mongoose to get all students in the database
   Student.find(function(err, students) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
         res.send(err);
      res.json(students); // return all students in JSON format
   });
});



app.post('/api/students/send', function (req, res) {
   var student = new Student(); // create a new instance of the student model
   console.log(req.body.name);
   student.name = req.body.name; // set the student name (comes from the request)
   student.save(function(err) {
      if (err)
         res.send(err);
         res.json({ message: 'student created!' });
   });
});

app.delete('/api/students/:student_id', function (req, res) {
   Student.remove({
      _id: req.params.student_id
   }, function(err, bear) {
      if (err)
         res.send(err);
      res.json({ message: 'Successfully deleted' });
   });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

