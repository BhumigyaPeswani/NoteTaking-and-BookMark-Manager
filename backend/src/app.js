const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/note.routes.js');
const bookmarkRoutes = require('./routes/bookmark.routes.js');
const { errorHandler, notFound } = require('./middleware/error.middleware.js');

const app = express();

// CORS middleware - allow frontend to access API
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));

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
