const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes.js');
const noteRoutes = require('./routes/note.routes.js');
const bookmarkRoutes = require('./routes/bookmark.routes.js');
const { errorHandler, notFound } = require('./middleware/error.middleware.js');
const { protect } = require('./middleware/auth.middleware.js');

const app = express();

// CORS middleware - allow all origins for deployment
app.use(cors({
    origin: true,
    credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes (public)
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/notes', protect, noteRoutes);
app.use('/api/bookmarks', protect, bookmarkRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
