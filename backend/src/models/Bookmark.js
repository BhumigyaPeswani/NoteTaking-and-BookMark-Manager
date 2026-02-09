const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        url: {
            type: String,
            required: [true, 'URL is required'],
            trim: true,
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        tags: {
            type: [String],
            default: [],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Add text index for search functionality
bookmarkSchema.index({ title: 'text', description: 'text', url: 'text' });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
