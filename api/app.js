const startupList = require("./startups.js");
const express = require("express");
const nounsList = require("./nouns.js");
const app = express();
const port = 3000;

const getStartupList = () => startupList.toString();
const getNounsList = () => nounsList.toString();

const getRandomIndex = array => array[Math.floor(Math.random() * array.length)];

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/idea", (req, res) => res.send("startup idea goes here"));

app.get("/startups", (req, res) => res.status(200).json(startupList));

app.get("/nouns", (req, res) => res.status(200).json(nounsList));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
