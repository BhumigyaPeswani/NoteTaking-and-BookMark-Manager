const Bookmark = require('../models/Bookmark.js');
const validateUrl = require('../utils/validateUrl.js');
const fetchTitle = require('../utils/fetchTitle.js');

/**
 * @desc    Create a new bookmark
 * @route   POST /api/bookmarks
 */
const createBookmark = async (req, res, next) => {
    try {
        let { url, title, description, tags, favorite } = req.body;

        if (!url) {
            res.status(400);
            throw new Error('URL is required');
        }

        // Validate URL format
        if (!validateUrl(url)) {
            res.status(400);
            throw new Error('Invalid URL format');
        }

        // Auto-fetch title if not provided
        if (!title || title.trim() === '') {
            const fetchedTitle = await fetchTitle(url);
            title = fetchedTitle || url;
        }

        const bookmark = await Bookmark.create({
            userId: req.user._id,
            url,
            title,
            description,
            tags,
            favorite,
        });

        res.status(201).json({
            success: true,
            data: bookmark,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all bookmarks with optional search, tag filter, and sorting
 * @route   GET /api/bookmarks?q=&tags=&sort=
 */
const getBookmarks = async (req, res, next) => {
    try {
        const { q, tags, sort } = req.query;
        let query = { userId: req.user._id };

        // Search by title, description, or url
        if (q) {
            query.$or = [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { url: { $regex: q, $options: 'i' } },
            ];
        }

        // Filter by tags
        if (tags) {
            const tagArray = tags.split(',').map((tag) => tag.trim());
            query.tags = { $in: tagArray };
        }

        // Sorting: default to updatedAt DESC
        const sortField = sort === 'created' ? 'createdAt' : 'updatedAt';
        const bookmarks = await Bookmark.find(query).sort({ [sortField]: -1 });

        res.status(200).json({
            success: true,
            count: bookmarks.length,
            data: bookmarks,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single bookmark by ID
 * @route   GET /api/bookmarks/:id
 */
const getBookmarkById = async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findOne({ _id: req.params.id, userId: req.user._id });

        if (!bookmark) {
            res.status(404);
            throw new Error('Bookmark not found');
        }

        res.status(200).json({
            success: true,
            data: bookmark,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update bookmark by ID
 * @route   PUT /api/bookmarks/:id
 */
const updateBookmark = async (req, res, next) => {
    try {
        const { url, title, description, tags, favorite } = req.body;

        let bookmark = await Bookmark.findOne({ _id: req.params.id, userId: req.user._id });

        if (!bookmark) {
            res.status(404);
            throw new Error('Bookmark not found');
        }

        // Validate URL if provided
        if (url && !validateUrl(url)) {
            res.status(400);
            throw new Error('Invalid URL format');
        }

        bookmark = await Bookmark.findByIdAndUpdate(
            req.params.id,
            { url, title, description, tags, favorite },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: bookmark,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete bookmark by ID
 * @route   DELETE /api/bookmarks/:id
 */
const deleteBookmark = async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findOne({ _id: req.params.id, userId: req.user._id });

        if (!bookmark) {
            res.status(404);
            throw new Error('Bookmark not found');
        }

        await Bookmark.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Bookmark deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBookmark,
    getBookmarks,
    getBookmarkById,
    updateBookmark,
    deleteBookmark,
};
