import { log, error } from '~/utils/logger';

const API_URL = process.env.API_URL || '';

class MeApi {
    static async fetchDisplayName() {
        log("Fetching display name", API_URL);
        try {
            // const response = await fetch(`${API_URL}/api/me`);
            const response = await fetch('${API_URL}/api/me', {
                method: 'GET', // or 'POST', etc.
                credentials: 'include', // This is crucial for including cookies
                // Other options...
            });
            if (response.ok) {
                return await response.json();
            } else {
                // Handle error response
                error("Error fetching display name");
                return "try-error";
            }
        } catch (err) {
            // Handle fetch error
            error("Error fetching display name:", err);
            return "catch-error";
        }
    }
}

export default MeApi;