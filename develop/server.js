const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
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

// Post new notes
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, results) => {
      if (err) {
          throw err
      } else {
          let notes = JSON.parse(results);
          let newNote = req.body;
          newNote.id = uuid();
          notes.push(newNote);
          fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
              if (err) {
                  throw err
              } else {
                  res.send('File created!');
              }
          });
      };
  });
});

// Delete note
app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', (err, results) => {
      if (err) {
          throw err
      } else {
          let notes = JSON.parse(results);
          let noteIds = req.params.id.toString();
          const noteArray = notes.filter(note => note.id.toString() !== noteIds);
          fs.writeFile('./db/db.json', JSON.stringify(noteArray), (err) => {
              if (err) {
                  throw err
              } else {
                  res.json(noteArray);
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
