const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
// mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


/*
app.use('/exercises', exercisesRouter); = localhost/:5000/exercises load info in exercisesRouter
app.use('/users', usersRouter);  = localhost/:5000/exercises load info in usersRouter
*/

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});