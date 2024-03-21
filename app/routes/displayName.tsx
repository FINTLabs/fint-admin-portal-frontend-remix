import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

interface ApiResponse {
    fullName: string;
}

export const loader: LoaderFunction = async ({ request }) => {
    const apiUrl = 'https://admin-beta.fintlabs.no/api/me';
    try {
        // Extract cookies from the incoming request
        const cookies = request.headers.get('Cookie');
        console.log("TEST: Extracted cookies from the incoming request:", cookies);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // Forward cookies to the API request
                ...(cookies ? { 'Cookie': cookies } : {}),
            },
        });

        console.log("TEST: Fetch request made to API.");

        if (!response.ok) {
            console.error(`TEST: API request failed with status ${response.status}`);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        console.log("TEST: Data received from API:", JSON.stringify(data));

        return json(data);
    } catch (error) {
        console.error("TEST: Failed to fetch display name:", error);
        throw new Response("Error fetching display name", { status: 500 });
    }
};

export default function DisplayName() {
    const { fullName } = useLoaderData<ApiResponse>();
    console.log("TEST: Rendering DisplayName component with fullName:", fullName);

    return (
        <div>
            <h1>Hello, {fullName}</h1>
        </div>
    );
}
