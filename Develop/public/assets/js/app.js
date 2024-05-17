const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// JSON parsing middleware
app.use(express.json());

// Middleware to log all requests for debugging purposes
app.use((req, res, next) => {
    console.log(`Received request for ${req.method} ${req.url}`);
    next();
});

// Explicit route to serve 'index.html' at root
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    console.log(`Explicitly serving index.html from: ${indexPath}`);
    res.sendFile(indexPath);
});

// HTML Route for notes
app.get('/notes', (req, res) => {
    const notesPath = path.join(__dirname, 'public', 'notes.html');
    console.log(`Serving notes.html from: ${notesPath}`);
    res.sendFile(notesPath);
});

// API Routes
app.get('/api/notes', (req, res) => {
    const dbPath = './db/db.json';
    console.log(`Fetching notes from database at: ${dbPath}`);
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file from ${dbPath}: ${err}`);
            res.status(500).send("Failed to load notes.");
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Wildcard Route: This should be your last route
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    console.log(`Serving index.html as fallback from: ${indexPath}`);
    res.sendFile(indexPath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




