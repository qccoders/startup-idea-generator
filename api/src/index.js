const express = require("express");
const cors = require("cors");

const startupList = require("./startups.js");
const nounsList = require("./nouns.js");

const app = express();
app.use(cors());

const port = 3001;

const getRandomIndex = array => array[Math.floor(Math.random() * array.length)];

const getIdeaPair = () => ({
  startup: getRandomIndex(startupList),
  noun: getRandomIndex(nounsList)
});

app.get("/api/idea", (req, res) => res.status(200).json(getIdeaPair()));

app.get("/api/startups", (req, res) => res.status(200).json(startupList));

app.get("/api/nouns", (req, res) => res.status(200).json(nounsList));

app.listen(port, () => console.log(`Startup Idea Generator API listening on port ${port}!`));