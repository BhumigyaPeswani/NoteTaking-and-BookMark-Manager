# Draftly - Notes & Bookmarks Manager

A minimal, editorial-style frontend for managing notes and bookmarks.

## Design Principles

- Editorial layout with generous whitespace
- Calm typography using Geist font
- Minimal color palette with light/dark mode toggle
- Focus on content and readability

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (React)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

## Folder Structure

```
frontend/
├── app/
│   ├── layout.js          # Root layout with Navbar & Footer
│   ├── page.js             # Landing page
│   ├── notes/
│   │   └── page.js         # Notes page
│   └── bookmarks/
│       └── page.js         # Bookmarks page
├── components/
│   ├── Container.jsx       # Centered content wrapper
│   ├── Navbar.jsx          # Top navigation with theme toggle
│   ├── Footer.jsx          # Page footer
│   ├── EmptyState.jsx      # Empty state placeholder
│   └── ThemeProvider.jsx   # Light/dark theme context
├── services/
│   └── api.js              # Placeholder API calls
└── styles/
    └── globals.css         # Global styles & theme
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Features

- **Theme Toggle**: Click the sun/moon icon in the navbar to switch between light and dark modes
- **Persistent Theme**: Your theme preference is saved to localStorage

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with navigation links |
| `/notes` | Notes page (empty state) |
| `/bookmarks` | Bookmarks page (empty state) |
