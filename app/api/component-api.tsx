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
}

export default ComponentApi;
