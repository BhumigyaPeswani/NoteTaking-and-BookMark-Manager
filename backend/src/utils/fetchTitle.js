/**
 * Fetches the title of a webpage from its URL
 * @param {string} url - The URL to fetch the title from
 * @returns {Promise<string|null>} - The page title or null if not found
 */
const fetchTitle = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
            timeout: 5000,
        });

        if (!response.ok) {
            return null;
        }

        const html = await response.text();

        // Extract title using regex
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);

        if (titleMatch && titleMatch[1]) {
            return titleMatch[1].trim();
        }

        return null;
    } catch (error) {
        console.error(`Error fetching title from ${url}:`, error.message);
        return null;
    }
};

module.exports = fetchTitle;
