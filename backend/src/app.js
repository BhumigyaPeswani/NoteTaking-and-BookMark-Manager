const express = require('express');
const noteRoutes = require('./routes/note.routes.js');
const bookmarkRoutes = require('./routes/bookmark.routes.js');
const { errorHandler, notFound } = require('./middleware/error.middleware.js');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/notes', noteRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
