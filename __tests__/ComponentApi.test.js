import ComponentApi from '../app/api/component-api'; // Adjust the import path as necessary

// Mocking fetch globally
global.fetch = jest.fn();

beforeEach(() => {
    fetch.mockClear();
});

describe('ComponentApi', () => {
    const API_URL = process.env.API_URL;

    describe('fetch', () => {
        it('should return data when fetch is successful', async () => {
            const mockData = [{ id: 1, name: 'Component 1' }];
            fetch.mockImplementationOnce(() => Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            }));

            const data = await ComponentApi.fetch();
            expect(data).toEqual(mockData);
            expect(fetch).toHaveBeenCalledWith(`${API_URL}/api/components/`);
        });

        it('should return null when fetch fails', async () => {
            fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));
            const data = await ComponentApi.fetch();
            expect(data).toBeNull();
        });

        // Add more tests to cover error handling, etc.
    });

    // Example test for fetchComponentsByOrganization
    describe('fetchComponentsByOrganization', () => {
        it('should filter components by selected organization', async () => {
            // Mock the fetch method to return specific data
            const mockComponents = [
                { id: 1, name: 'Component 1', organisations: ['org1'] },
                { id: 2, name: 'Component 2', organisations: ['org2'] }
            ];
            jest.spyOn(ComponentApi, 'fetch').mockResolvedValueOnce(mockComponents);
            const selectedOrganisation = { dn: 'org1' };

            const filteredComponents = await ComponentApi.fetchComponentsByOrganization(selectedOrganisation);
            expect(filteredComponents.length).toBe(1);
            expect(filteredComponents[0].name).toEqual('Component 1');
            // Restore original implementation if necessary
            ComponentApi.fetch.mockRestore();
        });
    });

    // Add tests for fetchComponentsByName, create, update, delete methods following a similar pattern
});

