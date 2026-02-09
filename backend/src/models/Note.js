const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        content: {
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
noteSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Note', noteSchema);
