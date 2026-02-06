/**
 * Validates if a string is a valid URL
 * @param {string} urlString - The URL string to validate
 * @returns {boolean} - True if valid URL, false otherwise
 */
const validateUrl = (urlString) => {
    try {
        new URL(urlString);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = validateUrl;
