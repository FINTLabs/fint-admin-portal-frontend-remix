import { json, LoaderFunction } from '@remix-run/node';

interface ApiResponse {
    fullName: string;
}

export const loader: LoaderFunction = async ({ request }) => {
    const apiUrl = 'https://admin-beta.fintlabs.no/api/me';
    try {
        // Extract cookies from the incoming request
        const cookies = request.headers.get('Cookie');

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // Forward cookies to the API request
                ...(cookies ? { 'Cookie': cookies } : {}),
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        return json(data);
    } catch (error) {
        console.error("Failed to fetch display name:", error);
        throw new Response("Error fetching display name", { status: 500 });
    }
};
export default function DisplayName({ fullName }: ApiResponse) {
    return (
        <div>
            <h1>Hello, {fullName}</h1>
        </div>
    );
}
