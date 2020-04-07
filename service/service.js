const express = require('express');
const app = express();
const path = require('path');
var server = require('http').Server(app);

server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
})

app.get('/src/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src/main.js'));
})

app.get('/src/levels/menu.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src/levels/menu.js'));
})

app.get('/src/levels/level1.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src/levels/level1.js'));
})

app.get('/src/levels/level2.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src/levels/level2.js'));
})

app.get('/src/levels/level3.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src/levels/level3.js'));
})

app.get('/src/public/func.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src/public/func.js'));
})

app.get('/assets/scene/BG/bg.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/BG/bg.png'));
})

app.get('/assets/scene/BG/menuBG.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/BG/menuBG.jpg'));
})

app.get('/assets/scene/Tiles/1.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Tiles/1.png'));
})

app.get('/assets/scene/Tiles/2.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Tiles/2.png'));
})

app.get('/assets/scene/Tiles/3.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Tiles/3.png'));
})

app.get('/assets/scene/Tiles/5.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Tiles/5.png'));
})

app.get('/assets/scene/Tiles/17.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Tiles/17.png'));
})

app.get('/assets/scene/Tiles/18.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Tiles/18.png'));
})

app.get('/assets/scene/Tiles/13.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Tiles/13.png'));
})

app.get('/assets/scene/Tiles/14.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Tiles/14.png'));
})

app.get('/assets/scene/Tiles/15.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Tiles/15.png'));
})

app.get('/assets/scene/Object/Mushroom_1.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Object/Mushroom_1.png'));
})

app.get('/assets/scene/Object/Mushroom_2.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Object/Mushroom_2.png'));
})

app.get('/assets/scene/Object/Crate.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Object/Crate.png'));
})

app.get('/assets/scene/Object/Stone.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/scene/Object/Stone.png'));
})

app.get('/assets/char/dude.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets/char/dude.png'));
})