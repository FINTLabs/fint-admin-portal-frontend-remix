const API_URL = process.env.API_URL || 'http://localhost:8080';

class MaintenanceApi {

  //TODO: move this to its own component and use it more?
  static async fetchConsistency(endpoint:String) {
    const url = `${API_URL}/api/maintenance/consistency/${endpoint}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        // Handle error response
        console.error(`Error fetching ${endpoint}`);
        return null;
      }
    } catch (error) {
      // Handle fetch error
      console.error(`Error fetching ${endpoint}:`, error);
      return null;
    }
  }

  static getOrganisationConsistency() {
    return MaintenanceApi.fetchConsistency('components/adapters');
  }

  static getAdapterConsistency() {
    return MaintenanceApi.fetchConsistency('components/adapters');
  }

  static getClientConsistency() {
    return MaintenanceApi.fetchConsistency('components/clients');
  }

  static getLegalConsistency() {
    return MaintenanceApi.fetchConsistency('contacts/legal');
  }

  static getTechnicalConsistency() {
    return MaintenanceApi.fetchConsistency('contacts/technical');
  }
}

export default MaintenanceApi;
