class ContactApi {
    static async fetchDisplayName() {
        try {
            const response = await fetch("http://localhost:8081/api/me");
            if (response.ok) {
                const data = await response.json();
                return data.fullName;
            } else {
                // Handle error response
                console.error("Error fetching display name");
                return null;
            }
        } catch (error) {
            // Handle fetch error
            console.error("Error fetching display name:", error);
            return null;
        }
    }

    static async fetchContacts() {
        try {
            const response = await fetch("http://localhost:8081/api/contacts");
            if (response.ok) {
                return await response.json();
            } else {
                // Handle error response
                console.error("Error fetching contacts");
                return null;
            }
        } catch (error) {
            // Handle fetch error
            console.error("Error fetching contacts:", error);
            return null;
        }
    }
}

export default ContactApi;
