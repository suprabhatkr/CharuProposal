const { time } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const path = require('path');
const currentDate = new Date();

app.use(express.json());
app.use(express.static('public')); // Serve static files

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
    res.log("hello it is me");
});

app.get('/response', (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'response.html'));
});
app.post('/save-response', (req, res) => {
    res.status(200).json({message: req.body.response});
    const responseText = `Response: ${req.body.response} ${currentDate.toLocaleTimeString()}\n`;
    
    fs.appendFile('index.html', responseText, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Error saving response');
        } else {
            console.log(currentDate.toLocaleTimeString());
            res.send('Response saved successfully!');
            res.log("hello it is me");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
