require('dotenv').config();
const app = require('./src/app.js');
const connectDB = require('./src/config/db.js');

const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
});
