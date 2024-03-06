const API_URL = process.env.API_URL;

class ComponentApi {
    static async fetch() {
        try {
            const response = await fetch(`${API_URL}/api/components/`);
            if (response.ok) {
                return await response.json();
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
    }

    static async fetchComponentsByOrganization(selectedOrganisation: { dn: string; }) {
        try {
            const components = await this.fetch();

            if (components && selectedOrganisation) {
                return components.filter((component: { organisations: string | string[]; }) =>
                    component.organisations.includes(selectedOrganisation.dn)
                );
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching components by organization:", error);
            return null;
        }
    }

    static async fetchComponentsByName(name: string | undefined) {
        const url = `${API_URL}/api/components/${name}`;
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error fetching components by name");
            throw new Response("Not Found", { status: 404 });
        }
    }

    static async create(componentData: {}) {
        console.log("component Data to add:", JSON.stringify(componentData));
        try {
            const response = await fetch(`${API_URL}/api/components`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(componentData)
            });

            if (response.ok) {
                if (response.status === 201) {
                    return { message: "Komponenten ble opprettet", variant: "success" }; // Component created
                }
                return { message: "Komponenten er oppdatert", variant: "success" }; // Component updated
            } else if (response.status === 302) {
                return { message: "Komponenten finnes fra før", variant: "warning" }; // Component already exists
            } else {
                console.error("Error creating component", response);
                return { message: "Det oppsto en feil ved opprettelse av komponenten.", variant: "error" }; // Error creating component
            }
        } catch (error) {
            console.error("Error creating component:", error);
            return { message: "Det oppsto en feil ved opprettelse av komponenten.", variant: "error" }; // Error creating component
        }
    }

    static async update(data: {}, name:String) {
        const url = `${API_URL}/api/components/${name}`;
        console.info("update component url", url, JSON.stringify(data));
        const request = new Request(url, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(data)
        });

        try {
            const response = await fetch(request);
            if (response.ok) {
                return { message: "Komponenten er oppdatert", variant: "info" };
            }
        }
        catch(error) {
            console.error("Error updating component", error);
            return { message: "Det oppsto en feil ved oppdatering av komponenten.", variant: "error" };
        }
    }

    static async delete(componentName: string) {
        const url = `${API_URL}/api/components/${componentName}`;
        console.log("delete component url", url);
        const request = new Request(url, {
            method: 'DELETE',
            credentials: 'same-origin'
        });

        const response = await fetch(request);
        if (response.ok) {
            throw new Response("Component successfully removed", {
                status: 410,
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
        } else {
            // If the condition is not met, return an object with an error message and variant
            return { message: "Det oppsto en feil ved sletting av komponenten.", variant: "error" };
        }


    }
}

export default ComponentApi;
