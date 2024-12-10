const express = require('express');
const compression = require('compression')
const app = express();
const port = 3000;

app.set('view engine', 'pug')
app.use(express.json());
app.use(compression())
app.use((req, res, next) => {
    if (req.url.startsWith('/static')) {
        res.set('Cache-Control', 'public, max-age=31536000');
    }
    next();
})
app.use('/static', express.static('static'))

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
    res.status(404);
    res.render('404', { url: req.url });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});