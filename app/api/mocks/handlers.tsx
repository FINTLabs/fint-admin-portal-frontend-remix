import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('http://localhost:8081/api/me', () => {
        return HttpResponse.json({
            fullName: 'Mocked User'
        } );
    }),
];
