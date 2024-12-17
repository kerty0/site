const express = require('express');
const compression = require('compression')
const fs = require('fs').promises;
const app = express();
const port = 3000;
const messages = "messages.json";

app.set('view engine', 'pug')
app.use(express.json());
app.use(compression())
app.use((req, res, next) => {
    if (req.url.endsWith('style.css?v=1')) {
        next();
        return;
    }
    if (req.url.startsWith('/static')) {
        res.set('Cache-Control', 'public, max-age=31536000');
    }
    next();
})
app.use('/static', express.static('static'))

async function readData() {
    try {
        const data = await fs.readFile(messages, 'utf8');
        if (data.trim() === "") {
            return { names: {} };
        }
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return { names: {} };
        } else {
            console.error("Error reading file:", error);
            throw error;
        }
    }
}

async function writeData(data) {
    try {
        await fs.writeFile(messages, JSON.stringify(data, null, 4), 'utf8');
    } catch (error) {
        console.error("Error writing file:", error);
        throw error;
    }
}

app.post('/submit', async (req, res) => {
    try {
        const { name, message, timestamp } = req.body;

        if (!name || !message || !timestamp) {
            return res.status(400).send('Name, message, and timestamp are required');
        }

        let data = await readData();

        if (!data.names) {
            data.names = {};
        }
        if (!data.names[name]) {
            data.names[name] = {};
        }
        data.names[name][timestamp] = message;

        await writeData(data);

        res.send('Thank you for your message!');
    } catch (error) {
        console.error("Error processing post request:", error);
        res.status(500).send('Internal server error');
    }
});

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