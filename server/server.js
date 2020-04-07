const express = require('express');
const app = express();
const path = require('path');

app.listen(8081, function () {
    console.log(`Listening on 8081`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
})

app.use('/static', express.static(path.join(__dirname, '..', 'src')));
app.use('/static', express.static(path.join(__dirname, '..', 'assets')));