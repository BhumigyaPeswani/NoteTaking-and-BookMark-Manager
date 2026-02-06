const express = require('express');
const router = express.Router();
const {
    createBookmark,
    getBookmarks,
    getBookmarkById,
    updateBookmark,
    deleteBookmark,
} = require('../controllers/bookmark.controller.js');

router.route('/').post(createBookmark).get(getBookmarks);

router.route('/:id').get(getBookmarkById).put(updateBookmark).delete(deleteBookmark);

module.exports = router;
