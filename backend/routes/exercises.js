const router = require('express').Router();
let Exercise = require('../models/exercise.model');


/* the ('/:id') is created from mongo db  

read in crud
  Exercise.find() =  search for all info
  .then(exercise => res.json(exercise))= if id found return json. I
 .catch(err => res.status(400).json('Error: ' + err)); = if not found return error
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
*/
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


/* the ('/:id') is created from mongo db  

read in crud
 Exercise.findById(req.params.id)  =  search for id
  .then(exercise => res.json(exercise))= if id found grab id by json. I
 .catch(err => res.status(400).json('Error: ' + err)); = if not found return error
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});
*/

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});




/* 
delete in crud
Exercise.findByIdAndDelete(req.params.id)  =  search for id and delete
  .then(exercise => res.json(exercise))= if id found delete id from json. I
 .catch(err => res.status(400).json('Error: ' + err)); = if not found return error
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});
*/
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


/*  update in crud
pass  ('/update/:id') route to update id
  Exercise.findById(req.params.id) =  search for id 

    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);});= if id found update all values on json from json. I
  exercise.save() = after save updates and return try and catch
*/

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;