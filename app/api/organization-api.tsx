const API_URL = process.env.API_URL;

class OrganizationApi {
    static async fetch() {
            const response = await fetch(`${API_URL}/api/organisations`);
            if (response.ok) {
                return await response.json();
            } else {
                console.error("Error fetching organizations");
                throw(new Error("Error fetching organizations") );
            }
    }

    static async fetchOrganizationByOrgNumber(orgNumber) {
        try {
            const organizations = await this.fetch();
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

    static async create(organisation) {
        const url = `${API_URL}/api/organisations`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: organisation.name,
                orgNumber: organisation.orgNumber,
                displayName: organisation.displayName,
            }),
        });
        if(response.ok) {
            return { message: "Organization ble opprettet", variant: "success" };
        } else {
            throw new Error("Det oppsto en feil ved opprettelse av organisation." + response.status + " " + response.statusText);
        }
    }

    static async update(organisation) {
        const url = `${API_URL}/api/organisations/${organisation.name}`;
        console.log("update org url", url);
        console.log("update org", JSON.stringify(organisation));

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(organisation),
        });
        if(response.ok) {
            return { message: "Organization ble oppdatert", variant: "success" };
        } else {
            return { message: "Det oppsto en feil ved oppdatering av organisations."+ response.status + " " + response.statusText, variant: "error" };
        }
    }

    static async delete(organisationName) {
        const url = `${API_URL}/api/organisations/${organisationName}`;
        console.log("delete org url", url);

        const response = await fetch(url, {
            method: "DELETE",
            credentials: 'same-origin'
        });

        if (response.ok) {
            throw new Response("Organization successfully removed", 410 );

        } else {
            return { message: "Det oppsto en feil ved sletting av organisation.", variant: "error" };
        }
    }

    static async setLegalContact(orgName, contactNin) {
        const url = `${API_URL}/api/organisations/${orgName}/contacts/legal/${contactNin}`;
        console.log("setLegalContact url", url);

        const response = await fetch(url, {
            method: "PUT",
            credentials: 'same-origin'
        });

        console.log("setLegalContact response", response);
        if(response.ok) {
            return {message: "Legal contact ble satt", variant: "success"};
        } else {
            return {message: "Det oppsto en feil ved oppdatering av legal contact.", variant: "error"};
        }
    }
}

export default OrganizationApi;
