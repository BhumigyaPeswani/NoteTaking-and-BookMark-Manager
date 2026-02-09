const Note = require('../models/Note.js');

/**
 * @desc    Create a new note
 * @route   POST /api/notes
 */
const createNote = async (req, res, next) => {
    try {
        const { title, content, tags, favorite } = req.body;

        if (!title) {
            res.status(400);
            throw new Error('Title is required');
        }

        const note = await Note.create({
            userId: req.user._id,
            title,
            content,
            tags,
            favorite,
        });

        res.status(201).json({
            success: true,
            data: note,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all notes with optional search, tag filter, and sorting
 * @route   GET /api/notes?q=&tags=&sort=
 */
const getNotes = async (req, res, next) => {
    try {
        const { q, tags, sort } = req.query;
        let query = { userId: req.user._id };

        // Search by title or content
        if (q) {
            query.$or = [
                { title: { $regex: q, $options: 'i' } },
                { content: { $regex: q, $options: 'i' } },
            ];
        }

        // Filter by tags
        if (tags) {
            const tagArray = tags.split(',').map((tag) => tag.trim());
            query.tags = { $in: tagArray };
        }

        // Sorting: default to updatedAt DESC
        const sortField = sort === 'created' ? 'createdAt' : 'updatedAt';
        const notes = await Note.find(query).sort({ [sortField]: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single note by ID
 * @route   GET /api/notes/:id
 */
const getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });

        if (!note) {
            res.status(404);
            throw new Error('Note not found');
        }

        res.status(200).json({
            success: true,
            data: note,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update note by ID
 * @route   PUT /api/notes/:id
 */
const updateNote = async (req, res, next) => {
    try {
        const { title, content, tags, favorite } = req.body;

        let note = await Note.findOne({ _id: req.params.id, userId: req.user._id });

        if (!note) {
            res.status(404);
            throw new Error('Note not found');
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, tags, favorite },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: note,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete note by ID
 * @route   DELETE /api/notes/:id
 */
const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });

        if (!note) {
            res.status(404);
            throw new Error('Note not found');
        }

        await Note.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
};
