

const express = require('express');
// const expressCache = require('cache-express')
const favicon = require('express-favicon')
const compression = require('compression')
const app = express();
const port = 3000;

function dir(path) {
    return __dirname + '/public/' + path;
}

app.set('view engine', 'pug')
// app.enable('view cache')
// app.use(express.json());
app.use(compression())
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.redirect(301, '/home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use((req, res) => {
    res.render('empty')
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});