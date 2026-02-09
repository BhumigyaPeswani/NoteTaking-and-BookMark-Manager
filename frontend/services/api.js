// API service for backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Notes API
export async function getNotes() {
    try {
        const res = await fetch(`${API_BASE_URL}/notes`);
        if (!res.ok) throw new Error('Failed to fetch notes');
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error('Error fetching notes:', error);
        return [];
    }
}

export async function getNoteById(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/notes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch note');
        const json = await res.json();
        return json.data || null;
    } catch (error) {
        console.error('Error fetching note:', error);
        return null;
    }
}

export async function createNote(data) {
    try {
        const res = await fetch(`${API_BASE_URL}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create note');
        const json = await res.json();
        return json.data || null;
    } catch (error) {
        console.error('Error creating note:', error);
        return null;
    }
}

export async function updateNote(id, data) {
    try {
        const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update note');
        const json = await res.json();
        return json.data || null;
    } catch (error) {
        console.error('Error updating note:', error);
        return null;
    }
}

export async function deleteNote(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete note');
        return true;
    } catch (error) {
        console.error('Error deleting note:', error);
        return false;
    }
}

// Bookmarks API
export async function getBookmarks() {
    try {
        const res = await fetch(`${API_BASE_URL}/bookmarks`);
        if (!res.ok) throw new Error('Failed to fetch bookmarks');
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        return [];
    }
}

export async function getBookmarkById(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/bookmarks/${id}`);
        if (!res.ok) throw new Error('Failed to fetch bookmark');
        const json = await res.json();
        return json.data || null;
    } catch (error) {
        console.error('Error fetching bookmark:', error);
        return null;
    }
}

export async function createBookmark(data) {
    try {
        const res = await fetch(`${API_BASE_URL}/bookmarks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create bookmark');
        const json = await res.json();
        return json.data || null;
    } catch (error) {
        console.error('Error creating bookmark:', error);
        return null;
    }
}

export async function updateBookmark(id, data) {
    try {
        const res = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update bookmark');
        const json = await res.json();
        return json.data || null;
    } catch (error) {
        console.error('Error updating bookmark:', error);
        return null;
    }
}

export async function deleteBookmark(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete bookmark');
        return true;
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        return false;
    }
}
