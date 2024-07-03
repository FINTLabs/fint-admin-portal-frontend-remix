import { log, error } from '~/utils/logger';

const API_URL = process.env.API_URL || 'http://fint-admin-portal-backend:8080';

class MeApi {
    static async fetchDisplayName(headers: HeadersInit | undefined) {
        log("Fetching display name", API_URL);
        // log("COOKIES for me", cookies);
        try {
            const response = await fetch(`${API_URL}/api/me`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Accept': 'application/json',
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
