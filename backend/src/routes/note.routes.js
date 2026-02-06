const express = require('express');
const router = express.Router();
const {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
} = require('../controllers/note.controller.js');

router.route('/').post(createNote).get(getNotes);

router.route('/:id').get(getNoteById).put(updateNote).delete(deleteNote);

module.exports = router;
