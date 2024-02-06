import {throwError} from "rxjs";

const API_URL = process.env.API_URL;

class OrganizationApi {
    static async fetchOrganizations() {

            const response = await fetch(`${API_URL}/api/organisations`);
            if (response.ok) {
                return await response.json();
            } else {
                console.error("Error fetching organizations");
                throw(new Error("Error fetching organizations") );
            }

    }

    static async fetchOrganizationsByName(name) {
        try {
            const url = `${API_URL}/api/organisations/${name}`;
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else {
                // Handle error response
                console.error("Error fetching organization by name");
                return null;
            }
        } catch (error) {
            // Handle fetch error
            console.error("Error fetching organization by name:", error);
            return null;
        }
    }

    static async fetchOrganizationByOrgNumber(orgNumber) {
        try {
            const organizations = await this.fetchOrganizations();
            if (organizations) {
                return organizations.find(org => org.orgNumber === orgNumber) || null;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching organization by org number:", error);
            return null;
        }
    }

    static async fetchLegalContact(organisation) {
        try {
            const url = `${API_URL}/api/organisations/${organisation.name}/contacts/legal`;
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else {
                // Handle error response
                console.error("Error fetching legal contact");
                return null;
            }
        } catch (error) {
            // Handle fetch error
            console.error("Error fetching legal contact:", error);
            return null;
        }
    }
}

export default OrganizationApi;
