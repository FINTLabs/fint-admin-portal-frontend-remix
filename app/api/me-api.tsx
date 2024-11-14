import { log, error } from '~/utils/logger';

const API_URL = process.env.API_URL ||'';

class MeApi {
    static async fetchDisplayName(request: Request) {
        // log("Fetching display name", API_URL);
        // log("COOKIES for me", headers);
        log("Fetching display name: ", API_URL);
        log("Request for me: ", request);
        // const cookies = request.headers.get("cookie") || "";
        try {
            const response = await fetch(`${API_URL}/api/me`, {
                method: 'GET',
                headers: {
                    // 'cookie': cookies,
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
