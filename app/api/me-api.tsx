const API_URL = process.env.API_URL;

class MeApi {
    static async fetchDisplayName() {
        try {
            const response = await fetch(`${API_URL}/api/me`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                // Handle error response
                console.error("Error fetching display name");
                return "try-error";
            }
        } catch (error) {
            // Handle fetch error
            console.error("Error fetching display name:", error);
            return "catch-error";
        }
    }
}

export default MeApi;