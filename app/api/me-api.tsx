import { log, error } from '~/utils/logger';

const API_URL = process.env.API_URL || 'https://admin-beta.fintlabs.no';

class MeApi {
    static async fetchDisplayName() {
        log("Fetching display name", API_URL);
        // log("COOKIES for me", cookies);
        try {
            const response = await fetch('http://localhost:8080/api/me', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    // 'Cookie': cookies,
                },
            });

            if (response.redirected) {
                log('Me Request was redirected:', response.url);
            }

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