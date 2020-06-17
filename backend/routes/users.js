const router = require('express').Router();

let User = require('../models/user.model');
/* this is mongoose route we created
// let User = require('../models/user.model');
*/

router.route('/').get((req, res) => {
  User.find()
//   User.find() = get all the users from the mongoatlas database this
    .then(users => res.json(users))
// .then(users => res.json(users)) the results (all users) return a promise in json format
    .catch(err => res.status(400).json('Error: ' + err));
    // .catch(err => res.status(400).json('Error: ' + err)); = if there is an error prompt erro
});

/* this is handels incoming http post request
at this route and this info
router.route('/add').post((req, res) => {
  const username = req.body.username; = the new username is part of the request body

  const newUser = new User({username}); = create a new instance of username

  newUser.save() = the new user is saved to the database
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});  */
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User has been added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


/*

read in crud
 users.findById(req.params.id)  =  search for id
  .then(users => res.json(users))= if id found grab id by json. I
 .catch(err => res.status(400).json('Error: ' + err)); = if not found return error
router.route('/:id').get((req, res) => {
  users.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
*/

router.route('/:id').get((req, res) => {
    
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('user deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(users => {
      users.username = req.body.username;

      users.save()
        .then(() => res.json('Users updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;