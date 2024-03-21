import { log, error } from '~/utils/logger';

const API_URL = process.env.API_URL || 'https://admin-beta.fintlabs.no';

class MeApi {
    static async fetchDisplayName() {
        log("Fetching display name", API_URL);
        try {
            const response = await fetch(`/api/me`);
            if (response.ok) {
                log("response from me fetch:", response);
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