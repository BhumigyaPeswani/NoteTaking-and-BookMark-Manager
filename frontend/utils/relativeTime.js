/**
 * Get relative time string from a date
 * @param {string|Date} date - The date to format
 * @param {string|Date} createdAt - The creation date for comparison
 * @returns {string} Relative time string
 */
export function getRelativeTime(date, createdAt) {
    if (!date) return '';

    const now = new Date();
    const updatedDate = new Date(date);
    const createdDate = createdAt ? new Date(createdAt) : null;

    // Check if never edited (updatedAt equals createdAt within 1 second tolerance)
    const wasEdited = createdDate
        ? Math.abs(updatedDate.getTime() - createdDate.getTime()) > 1000
        : true;

    const diffMs = now - updatedDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const prefix = wasEdited ? 'Edited' : 'Created';

    if (diffDays === 0) {
        return `${prefix} today`;
    } else if (diffDays === 1) {
        return `${prefix} yesterday`;
    } else if (diffDays < 7) {
        return `${prefix} ${diffDays} days ago`;
    } else if (diffDays < 14) {
        return `${prefix} 1 week ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${prefix} ${weeks} weeks ago`;
    } else {
        const months = Math.floor(diffDays / 30);
        return `${prefix} ${months} month${months > 1 ? 's' : ''} ago`;
    }
}
