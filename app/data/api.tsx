// api.js
export const fetchDisplayName = async () => {
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
};

export const fetchComponents = async () => {
    try {
        const response = await fetch("http://localhost:8081/api/components");
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            // Handle error response
            console.error("Error fetching components");
            return null;
        }
    } catch (error) {
        // Handle fetch error
        console.error("Error fetching components:", error);
        return null;
    }
};

export const fetchContacts = async () => {
    try {
        const response = await fetch("http://localhost:8081/api/contacts");
        if (response.ok) {
            const data = await response.json();
            return data;
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
};

export const fetchOrganizations = async () => {
    try {
        const response = await fetch("http://localhost:8081/api/organisations");
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {

            console.error("Error fetching organizations")
        }
    } catch (error) {
        console.error("Error fetching organizations", error)
    }
};
