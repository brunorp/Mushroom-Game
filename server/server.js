const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')

app.use(cors())
app.use('/static', express.static(path.join(__dirname, '..', 'src')));
app.use('/static', express.static(path.join(__dirname, '..', 'assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
})
app.listen(8081, function () {
    console.log(`Listening on 8081`);
});