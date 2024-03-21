import { json, LoaderFunction } from '@remix-run/node';

interface ApiResponse {
    fullName: string;
}

export const loader: LoaderFunction = async ({ request }) => {
    const apiUrl = 'https://admin-beta.fintlabs.no/api/me';

    // Attempt to retrieve the token from the Cookie header or Authorization header
    const cookies = request.headers.get('Cookie');
    const authToken = cookies ? parseCookie(cookies, 'AuthToken') : null; // Implement parseCookie to extract token

    // Alternatively, if the token is in the Authorization header
    // const authToken = request.headers.get('Authorization')?.replace('Bearer ', '');

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
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

// Utility function to parse cookies and extract the token
// This is a basic implementation; you might need a more robust parser depending on your needs
function parseCookie(cookieHeader: string, name: string): string | null {
    const value = `; ${cookieHeader}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
}
export default function DisplayName({ fullName }: ApiResponse) {
    return (
        <div>
            <h1>Hello, {fullName}</h1>
        </div>
    );
}
