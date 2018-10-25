const awsServerlessExpress = require('aws-serverless-express');  
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const cors = require('cors');
const bodyParser = require('body-parser'); 

const startupList = require("./startups.js");
const express = require("express");
const nounsList = require("./nouns.js");

const app = express();
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cors({ exposedHeaders: 'X-Total-Count' }));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

const getStartupList = () => startupList.toString();
const getNounsList = () => nounsList.toString();

const getRandomIndex = array => array[Math.floor(Math.random() * array.length)];
const getIdeaPair = () => ({
  startup: getRandomIndex(startupList),
  noun: getRandomIndex(nounsList)
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/idea", (req, res) => res.send("startup idea goes here"));

app.get("/startups", (req, res) => res.status(200).json(startupList));

app.get("/nouns", (req, res) => res.status(200).json(nounsList));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);