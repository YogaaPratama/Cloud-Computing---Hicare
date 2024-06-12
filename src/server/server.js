
require('dotenv').config();


const express = require('express');
const cors = require('cors');
const routes = require('../server/routes'); 
const InputError = require('../exceptions/InputError'); 


const app = express();


const port = 6500;
const host = '0.0.0.0';



app.use(cors());


app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.path}`);
  next(); 
});


app.use(routes);


app.use((err, req, res, next) => {

  if (err instanceof InputError) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }


  if (err) {
    return res.status(413).json({
      status: 'fail',
      message: err.message,
    });
  }


  next();
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
