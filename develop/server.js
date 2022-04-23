const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;

const app = express();

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

/* notes APIs */

// Go to notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Get saved notes
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, results) => {
      if (err) {
          throw err
      } else {
          res.send(results);
      }
  });
})

// POST /api/notes should receive new note on the req.body and add to db.json and return the new note to client
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, results) => {
      if (err) {
          throw err
      } else {
          let existingNotes = JSON.parse(results);
          let newNotes = req.body;
          // each note should have unique ID when saved
          let noteLength = (existingNotes.length).toString();
          newNotes.id = noteLength;
          // pushing updated notes with ids to existing notes array
          existingNotes.push(newNotes);
          // writing to file updated notes array
          fs.writeFile('./db/db.json', JSON.stringify(existingNotes), (err) => {
              if (err) {
                  throw err
              } else {
                  res.send('File created!');
              }
          });
      };
  });
});

/* index APIs */

// Go to index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Listener to verify port connectivity
app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});
