const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/idea', (req, res) => res.send('startup idea goes here'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
