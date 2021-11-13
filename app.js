require("dotenv").config();

const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const serverDetails = require('./utils/serverDetails');

global.__basedir = __dirname;   
const app = express();



app.use(cors({
  origin: true,
  methods: ["GET", "POST"],
  credentials: true,
}));


app.use(serverDetails);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/v1', require('./routes'));

const port = parseInt(process.env.PORT, 10) || 5000;
app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
});