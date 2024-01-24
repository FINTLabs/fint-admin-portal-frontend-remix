class ComponentApi {
    static async fetchComponents() {
        try {
            const response = await fetch("http://localhost:8081/api/components");
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

    static async fetchComponentsByOrganization(selectedOrganisation) {
        try {
            const components = await this.fetchComponents();

            if (components && selectedOrganisation) {
                return components.filter((component) =>
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

    static async fetchComponentsByName(name) {
        try {
            const url = `http://localhost:8081/api/components/${name}`;
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else {
                // Handle error response
                console.error("Error fetching components by name");
                return null;
            }
        } catch (error) {
            // Handle fetch error
            console.error("Error fetching components by name:", error);
            return null;
        }
    }

    static async createComponent(componentData) {
        console.log("componentData", JSON.stringify(componentData));
        try {
            const response = await fetch("http://localhost:8081/api/components", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(componentData)
            });

            if (response.ok) {
                return response;
            } else {
                console.error("Error creating component", response);
                return null;
            }
        } catch (error) {
            console.error("Error creating component:", error);
            throw error;
        }
    }

    static deleteComponent(component) {
        const url = `/api/components/${component.name}`;
        const request = new Request(url, {
            method: 'DELETE',
            credentials: 'same-origin'
        });

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }
}

export default ComponentApi;
