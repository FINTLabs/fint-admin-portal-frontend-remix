import type {IOrganization} from "~/api/types";
const API_URL = process.env.API_URL;

class ContactApi {

    static async fetchContacts() {
        try {
            const response = await fetch(`${API_URL}/api/contacts`);
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
// make a create contact function that takes in a contact object and sends it to the api
    static async createContact(contactData) {
        console.log("contact Data to add:", JSON.stringify(contactData));
        try {
            const response = await fetch(`${API_URL}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            if (response.ok) {
                return await response.json();
            } else {
                // Handle error response
                console.error("Error creating contact");
                return null;
            }
        } catch (error) {
            // Handle fetch error
            console.error("Error creating contact:", error);
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
