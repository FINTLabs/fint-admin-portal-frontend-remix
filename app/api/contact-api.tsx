import type {IContact, IOrganization} from "~/api/types";
import {json} from "@remix-run/node";
import { log, error } from '~/utils/logger';

const API_URL = process.env.API_URL || 'https://admin-beta.fintlabs.no';

class ContactApi {

// Assuming API_URL is correctly defined somewhere in your code
    static async fetch(cookies: string) {
        log("TESTING NEW ");
        log("COOKIES in contact", cookies);

        try {
            const response = await fetch(`${API_URL}/api/contacts`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Cookie': cookies,
                },
            });
            if (response.redirected) {
                log('Contact Request was redirected:', response.url);
            }

            log("response from contact fetch:", response);
            if (response.ok) {
                const responseData = await response.json(); // Properly read the JSON response
                log("response from contact fetch:", responseData); // Log the actual data
                return responseData; // Adjust based on what you want to do with the data
            } else {
                // Handle error response
                error("Error fetching contacts, status:", response.status);
                return null; // Consider throwing an error or returning a more descriptive error object
            }
        } catch (err) {
            // Handle fetch error
            error("Error fetching contacts:", err);
            return null; // Consider a more descriptive error handling approach
        }
    }





    static async create(data: {}) {
        try {
            const response = await fetch(`${API_URL}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                return {message: "Contact created!", variant: "success"};
            } else {
                return {message: "Error creating contact", variant: "error"};
            }
        } catch (error) {
            return null;
        }
    }

    static async fetchTechnicalContactsByOrganization(organization: IOrganization) {
        // try {
        //     const contacts = await this.fetch();
        //     if (contacts && organization) {
        //         return contacts.filter((contact: IContact) =>
        //             organization.techicalContacts.includes(contact.dn)
        //         );
        //     } else {
        //         return null;
        //     }
        // } catch (error) {
        //     console.error("Error fetching technical contacts by organization:", error);
        //     return null;
        // }
        return null;
    }

    static async update(data: {}, nin: string) {
        try {
            const response = await fetch(`${API_URL}/api/contacts/${nin}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                return {message: "Contact updated!", variant: "success"};
            } else {
                return {message: "Error updating contact", variant: "error"};
            }

        } catch (error) {
            console.error("Error creating contact:", error);
            return {message: `Error updating contact: ${error}`, variant: "error"};
        }
    }

    static async delete(data: {}, nin: string) {
        try {
            const response = await fetch(`${API_URL}/api/contacts/${nin}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                return {message: "Contact deleted!", variant: "success"};
            } else {
                return {message: "Error removing contact", variant: "error"};
            }

        } catch (error) {
            console.error("Error removing contact:", error);
            return {message: `Error removing contact: ${error}`, variant: "error"};
        }

    }
}

export default ContactApi;
