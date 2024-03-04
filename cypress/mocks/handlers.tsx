import { http, HttpResponse } from 'msw';
import contacts from '../fixtures/contacts.json';
import organizations from '../fixtures/organizations.json';
import components from '../fixtures/components.json';
import components_single from '../fixtures/components_single.json';

const API_URL = 'http://localhost:8081'; // Adjust this to match your API's base URL

export const handlers = [
    http.get(`${API_URL}/api/contacts`, () => {
        return HttpResponse.json(contacts);
    }),

    http.post(`${API_URL}/api/contacts`, () => {
        // return HttpResponse.json( { status: 201 })
        return HttpResponse.json( { message: "Contact created!", variant: "success" })
    }),

    http.get('http://localhost:8081/api/me', () => {
        return HttpResponse.json({
            fullName: 'Mocked User'
        } );
    }),

    http.get('http://localhost:8081/api/organisations', () => {
        return HttpResponse.json(organizations);
    }),

    http.get(`${API_URL}/api/components/`, () => {
        return HttpResponse.json(components);
    }),

    http.get(`${API_URL}/api/components/death_star_systems`, () => {
        return HttpResponse.json(components_single);
    }),
];
