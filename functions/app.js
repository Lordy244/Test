const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

app.use(cors());
// Define a basic endpoint

router.get('/', (req, res) => {
    console.log("Dfdfdfdf");
    res.send('Hello, World!!');
});

router.get('/about', (req, res) => {
  res.send('This is the about page.');
});

app.use('/.netlify/functions/app', router);

module.exports.handler = serverless(app);