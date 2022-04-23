const express = require('express');
const path = require('path');
const PORT = 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});

// Go to notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Go to index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
