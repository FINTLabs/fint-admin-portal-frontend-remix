import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import {log} from "~/utils/logger";

// Type definition for the API response
interface ApiResponse {
    fullName: string;
}

// Type definition for the loader data
type LoaderData = ApiResponse;

// Loader function to fetch the display name from the API
export const loader: LoaderFunction = async (): Promise<Response> => {
    const apiUrl = "https://admin-beta.fintlabs.no/api/me";
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (response.redirected) {
            log('Me Request was redirected:', response.url);
        }

        if (!response.ok) {
            // Handle non-OK responses gracefully
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        return json(data);
    } catch (error) {
        console.error("Failed to fetch display name:", error);
        // In real-world scenarios, consider more nuanced error handling and response
        throw new Response("Error fetching display name", { status: 500 });
    }
};

export default function DisplayName() {
    const { fullName } = useLoaderData<LoaderData>();

    return (
        <div>
            <h1>Display Name</h1>
            <p>{fullName}</p>
        </div>
    );
}
