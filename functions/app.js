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

router.get('/download-file', async (req, res) => {
    const fileId = 'dswt0e05bb00cef80425bae6e1efc86d84ba1'; // Replace with the URL of the file you want to download
  
    try {
      // Download the file using Axios
      const response = await axios.get(`https://download-accl.zoho.com/v1/workdrive/download/${fileId}`, {
        headers: { 
            'Authorization': 'Zoho-oauthtoken 1000.f02a139267794858cc3564527f33987c.f7ddc1836fc32c6e9c80214ba348b5fc'
        },
        responseType: 'arraybuffer', // Important to handle binary data correctly
      });
  
      // Set the appropriate headers for the response
      res.setHeader('Content-Disposition', 'attachment; filename="downloaded-file.jpg"'); // Adjust filename and type as necessary
      res.setHeader('Content-Type', response.headers['content-type']);
  
      // Send the file content in the response
      res.send(response.data);
    } catch (error) {
      console.error('Error downloading the file:', error);
      res.status(500).send('Failed to download file');
    }
});

router.get('/about', (req, res) => {
  res.send('This is the about page.');
});

app.use('/.netlify/functions/app', router);

module.exports.handler = serverless(app);