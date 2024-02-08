import type {IOrganization} from "~/api/types";

const API_URL = process.env.API_URL;

class ContactApi {

    static async fetch() {
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

    static async create(contactData) {

        try {
            const response = await fetch(`${API_URL}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            console.log("sent to api:", JSON.stringify(contactData));

            if (response.ok) {
                console.log("response ok", response.statusText);
                return {message: "Contact created!", variant: "success"};
            } else {
                console.log("response ok", response.statusText);
                return {message: "Error creating contact", variant: "error"};
            }

        } catch (error) {
            console.error("Error creating contact:", error);
            return null;
        }

    }

    static async fetchTechnicalContactsByOrganization(organization: IOrganization) {
        try {
            const contacts = await this.fetch();
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

    static async update(contactData) {
        try {
            const response = await fetch(`${API_URL}/api/contacts/${contactData.nin}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            console.log("sent to api:", JSON.stringify(contactData));

            if (response.ok) {
                console.log("response ok", response.statusText);
                return {message: "Contact updated!", variant: "success"};
            } else {
                console.log("response ok", response.statusText);
                return {message: "Error updating contact", variant: "error"};
            }

        } catch (error) {
            console.error("Error creating contact:", error);
            return {message: `Error updating contact: ${error}`, variant: "error"};
        }
    }

    static async delete(contactData) {
        try {
            const response = await fetch(`${API_URL}/api/contacts/${contactData.nin}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            if (response.ok) {
                console.log("response ok", response.statusText);
                return {message: "Contact deleted!", variant: "success"};
            } else {
                console.log("Error:", response.statusText);
                return {message: "Error removing contact", variant: "error"};
            }

        } catch (error) {
            console.error("Error removing contact:", error);
            return {message: `Error removing contact: ${error}`, variant: "error"};
        }

    }
}

export default ContactApi;
