const API_URL = process.env.API_URL || 'http://localhost:8080';

class AccessTemplateApi {

    static async fetchAccessTemplates() {
        try {
            const response = await fetch(`${API_URL}/api/accesspackage/template`);

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

    static async fetchTemplateByName(templateName: String) {
        try {
            const templates = await this.fetchAccessTemplates();
            if (templates) {
                return templates.find((t: { name: String; }) => t.name === templateName)
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