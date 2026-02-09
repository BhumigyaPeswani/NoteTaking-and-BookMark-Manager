# 📝 Inkwell — Personal Notes & Bookmark Manager

Inkwell is a calm, minimal **personal knowledge management SaaS-style application** that allows users to create notes, save bookmarks, and organize information efficiently.

Built with a **Quiet Productivity** design philosophy, Inkwell focuses on simplicity, clarity, and distraction-free usage.

---

## ✨ Features

### Core Features
- 📝 Create, edit, and delete notes
- 🔖 Save bookmarks with URL, title, and description
- 🏷 Tag-based organization and filtering
- 🔍 Search notes and bookmarks by text
- ⭐ Mark notes and bookmarks as favorites
- 📌 Pin important notes
- 🕒 Relative timestamps (e.g. *Edited 2 days ago*)
- ↕ Sort by recently updated or recently created

### Authentication & Security
- 🔐 User signup and login
- 🪪 JWT-based authentication
- 🔒 Protected routes
- 🔑 Password hashing using bcrypt

### UX & Design
- 🎨 Quiet Productivity theme
- 📖 Reading-focused editorial layout
- 📱 Fully responsive (mobile-first)
- 🧘 Minimal and distraction-free UI

### Bonus Features
- 🧠 Auto-fetch bookmark title if left empty
- 🗑 Soft delete support (future-ready)
- 🌙 Dark mode (planned)

---

## 🧠 Why Inkwell?

Inkwell demonstrates **real-world SaaS fundamentals**, including:
- RESTful API design
- Authentication & authorization
- Clean backend architecture
- Reusable frontend components
- Thoughtful UX decisions

This project is ideal for portfolios and technical interviews.

---

## 🏗 Tech Stack

### Frontend
- Next.js (App Router)
- React (JavaScript)
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt

---

## 📂 Project Structure

### Backend
```txt
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Note.js
│   │   └── Bookmark.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── note.controller.js
│   │   └── bookmark.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── note.routes.js
│   │   └── bookmark.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── utils/
│   │   ├── validateUrl.js
│   │   └── fetchTitle.js
│   └── app.js
├── server.js
└── README.md
Frontend
frontend/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── login/
│   │   └── page.js
│   ├── signup/
│   │   └── page.js
│   ├── notes/
│   │   └── page.js
│   └── bookmarks/
│       └── page.js
├── components/
│   ├── Navbar.jsx
│   ├── AuthForm.jsx
│   ├── NoteCard.jsx
│   ├── BookmarkCard.jsx
│   ├── SearchBar.jsx
│   ├── TagFilter.jsx
│   └── EmptyState.jsx
├── context/
│   └── AuthContext.js
├── services/
│   └── api.js
└── README.md
🔌 API Documentation
Authentication
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
Notes
POST   /api/notes
GET    /api/notes?q=&tags=&sort=
GET    /api/notes/:id
PUT    /api/notes/:id
DELETE /api/notes/:id
Bookmarks
POST   /api/bookmarks
GET    /api/bookmarks?q=&tags=&sort=
GET    /api/bookmarks/:id
PUT    /api/bookmarks/:id
DELETE /api/bookmarks/:id
🔐 All notes and bookmarks routes require a valid JWT token.

⚙️ Environment Variables
Create a .env file in the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
🚀 Getting Started
Backend
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm run dev
Frontend: http://localhost:3000

Backend: http://localhost:5000

🧪 Example API Request
GET /api/notes?sort=updated
Authorization: Bearer <JWT_TOKEN>
🧭 Roadmap
🌙 Dark mode

📂 Collections / folders

🗑 Trash & restore

📤 Export notes (Markdown / TXT)

🔄 Refresh token support

🧑‍💻 Learning Outcomes
REST API design

JWT authentication

MongoDB data modeling

React state management

Clean UI/UX design

Full-stack project structuring

📜 License
MIT License

🙌 Acknowledgements
Inspired by modern minimal note-taking and productivity tools.