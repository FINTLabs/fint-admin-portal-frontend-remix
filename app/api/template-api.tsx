class AccessTemplateApi {

    static async fetchAccessTemplates() {

        try {
            const response = await fetch("http://localhost:8081/api/accesspackage/template");
            if (response.ok) {
                return await response.json();
            } else {
                console.error("Error fetching templates");
                return null;
            }
        } catch (error) {
            console.error("Error fetching templates", error);
            return null;
        }
    }

    static async fetchTemplateByName(templateName) {
        try {
            const templates = await this.fetchAccessTemplates();
            if (templates) {
                return templates.find((t) => t.name === templateName)
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching templates by name:", error);
            return null;
        }
    }
}

export default AccessTemplateApi;