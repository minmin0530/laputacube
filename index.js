const http = require('http');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/src/main.js', (req, res) => {
    res.sendFile(__dirname + '/src/main.js');
});
app.get('/lib/Orbitcontrols.js', (req, res) => {
    res.sendFile(__dirname + '/lib/Orbitcontrols.js');
});
app.get('/src/cube.js', (req, res) => {
    res.sendFile(__dirname + '/src/cube.js');
});

app.get('/Box.glb', (req, res) => {
    res.sendFile(__dirname + '/Box.glb');
});



app.listen(port, () => {
  console.log(`Server running ...`);
});