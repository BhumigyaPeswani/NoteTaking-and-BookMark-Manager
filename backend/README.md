# Notes & Bookmarks API

A simple MVP backend for managing personal notes and bookmarks.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update the values:

```bash
cp .env.example .env
```

Update `.env` with your MongoDB connection string:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/notes_app
JWT_SECRET=your_jwt_secret_here
```

### 3. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

---

## API Routes

### Notes API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/notes` | Create a new note |
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes?q=search&tags=tag1,tag2` | Search and filter notes |
| GET | `/api/notes/:id` | Get note by ID |
| PUT | `/api/notes/:id` | Update note by ID |
| DELETE | `/api/notes/:id` | Delete note by ID |

### Bookmarks API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookmarks` | Create a new bookmark |
| GET | `/api/bookmarks` | Get all bookmarks |
| GET | `/api/bookmarks?q=search&tags=tag1,tag2` | Search and filter bookmarks |
| GET | `/api/bookmarks/:id` | Get bookmark by ID |
| PUT | `/api/bookmarks/:id` | Update bookmark by ID |
| DELETE | `/api/bookmarks/:id` | Delete bookmark by ID |

---

## Sample Request Bodies

### Create Note

```json
POST /api/notes
{
  "title": "My First Note",
  "content": "This is the content of my note",
  "tags": ["personal", "ideas"],
  "favorite": false
}
```

### Create Bookmark

```json
POST /api/bookmarks
{
  "url": "https://example.com",
  "title": "Example Website",
  "description": "A sample bookmark",
  "tags": ["reference", "web"],
  "favorite": true
}
```

> **Note:** If `title` is not provided for a bookmark, it will be automatically fetched from the URL.

### Update Note/Bookmark

```json
PUT /api/notes/:id
{
  "title": "Updated Title",
  "favorite": true
}
```

---

## Response Format

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Features

- ✅ Full CRUD operations for Notes and Bookmarks
- ✅ Search by title/content with `?q=` query parameter
- ✅ Filter by tags with `?tags=tag1,tag2` query parameter
- ✅ URL validation for bookmarks
- ✅ Auto-fetch page title from URL if not provided
- ✅ Centralized error handling
- ✅ Proper HTTP status codes
