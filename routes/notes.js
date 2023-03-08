const express = require("express");
const router = express.Router();
const notesController = require('../controllers/notes_controller');

router.post('/upload_notes', notesController.uploadNotes);
router.get('/view/:id', notesController.viewNote);
router.put('/like/:id', notesController.likeNote);
router.put('/view/:id', notesController.viewNoteCount);

module.exports = router;