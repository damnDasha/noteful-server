const express = require('express');
const jsonParser = express.json();
const notesRouter = express.Router();
const NotesService = require('./notes-service');

// create note

const serializeNotes = (note) => ({
  id: note.id,
  title: note.title,
  content: note.content,
  date: note.date,
  folder_id: Number(note.folder_id),
});

notesRouter
  .route('/')
  .get((req, res, next) => {
    NotesService
      .getAllNotes(req.app.get('db'))
      .then((notes) => {
        res.json(notes.map(serializeNotes));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    req.app.get('db');

    const { id, title, content, folder_id, date } = req.body;

    const note = {
      title,
      content,
      folder_id,
    };

    if (id) note.id = id;
    if (date) note.date = date;

    NotesService.insertNote(req.app.get('db'), note)
      .then((note) => {
        return res.json(note);
      })
      .catch(next);
  });

// read notes, update notes, delete
notesRouter
  .route('/:id')
  .get((req, res, next) => {
    const { id } = req.params;
    
    NotesService
      .getById(req.app.get('db'), id)
      .then((note) => {
        if (note) {
          return res.status(200).json(note);
        } else {
          return res.status(404).send('Note not found');
        }
      })
      .catch(next);
  })
  .patch((req, res, next) => {
    const { id, title, content, date } = req.body;

    const noteToUpdate = {
      id,
      title,
      content,
      date,
    };

    if (!title) {
      return res.status(404).json({ error: 'must include title' });
    }

    if (!content) {
      return res.status(404).json({
        error: 'must include content',
      });
    }

    NotesService
      .updateNote(req.app.get('db'), noteToUpdate)
      .then((noteToUpdate) => {
        res.json(noteToUpdate);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    NotesService
      .deleteNote(req.app.get('db'), req.params.id)
      .then(() => {
        res.status(204).json({});
      })
      .catch(next);
  });

module.exports = notesRouter;
