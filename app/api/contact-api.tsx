import type {IOrganization} from "~/api/types";

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

    static async fetchTechnicalContactsByOrganization(organization: IOrganization) {
        try {
            const contacts = await this.fetchContacts();
            if (contacts && organization) {
                return contacts.filter((contact) =>
                    organization.techicalContacts.includes(contact.dn)
                );
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching technical contacts by organization:", error);
            return null;
        }
    }
}

export default ContactApi;
