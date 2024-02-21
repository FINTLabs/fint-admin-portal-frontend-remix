import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('http://localhost:8081/api/contacts', () => {
        return HttpResponse.json([
                {
                    "dn": "cn=2d9b5ef8-3d9d-4f7a-8e5f-abc14fd72719,ou=contacts,o=galaxy",
                    "nin": "2d9b5ef8-3d9d-4f7a-8e5f-abc14fd72719",
                    "firstName": "Luke",
                    "lastName": "Skywalker",
                    "mail": "luke.skywalker@rebelalliance.org",
                    "mobile": "94736283",
                    "technical": ["pilot", "jedi"],
                    "legal": ["rebel"],
                    "supportId": null,
                    "roles": ["Jedi Knight", "Commander"]
                },
                {
                    "dn": "cn=4e3f6c2d-6e8f-4e07-b2d5-df56c8a8a117,ou=contacts,o=galaxy",
                    "nin": "4e3f6c2d-6e8f-4e07-b2d5-df56c8a8a117",
                    "firstName": "Leia",
                    "lastName": "Organa",
                    "mail": "leia.organa@rebelalliance.org",
                    "mobile": "95847295",
                    "technical": ["diplomat", "leader"],
                    "legal": ["princess", "rebel"],
                    "supportId": null,
                    "roles": ["Princess", "General"]
                },
                {
                    "dn": "cn=5a8d0e47-7e6d-4a83-9c8d-eda214f9d47b,ou=contacts,o=galaxy",
                    "nin": "5a8d0e47-7e6d-4a83-9c8d-eda214f9d47b",
                    "firstName": "Han",
                    "lastName": "Solo",
                    "mail": "han.solo@millenniumfalcon.org",
                    "mobile": "95273829",
                    "technical": ["pilot", "smuggler"],
                    "legal": ["rebel"],
                    "supportId": null,
                    "roles": ["Captain", "General"]
                },
                {
                    "dn": "cn=7bd1c386-fbe8-4f90-8d2e-22f2075a8b50,ou=contacts,o=galaxy",
                    "nin": "7bd1c386-fbe8-4f90-8d2e-22f2075a8b50",
                    "firstName": "Chewbacca",
                    "lastName": "",
                    "mail": "chewbacca@kashyyyk.org",
                    "mobile": "95648392",
                    "technical": ["co-pilot", "mechanic"],
                    "legal": ["rebel"],
                    "supportId": null,
                    "roles": ["First Mate", "Mechanic"]
                },
                {
                    "dn": "cn=9f8b1c2e-f47d-4a4e-8cbe-df2c8a8d4557,ou=contacts,o=galaxy",
                    "nin": "9f8b1c2e-f47d-4a4e-8cbe-df2c8a8d4557",
                    "firstName": "Obi-Wan",
                    "lastName": "Kenobi",
                    "mail": "obiwan.kenobi@jediorder.org",
                    "mobile": "94473829",
                    "technical": ["jedi", "pilot"],
                    "legal": ["jedi"],
                    "supportId": null,
                    "roles": ["Jedi Master", "General"]
                }
            ]
        );
    }),

    http.get('http://localhost:8081/api/me', () => {
        return HttpResponse.json({
            fullName: 'Mocked User'
        } );
    }),

    http.get('http://localhost:8081/api/organisations', () => {
        return HttpResponse.json([{
                "dn": "ou=jenniferabc,ou=organisations,o=fint",
                "name": "Test Org A",
                "orgNumber": "123456",
                "displayName": "jennifertestb",
                "components": [],
                "legalContact": null,
                "techicalContacts": [],
                "k8sSize": null,
                "customer": false,
                "primaryAssetId": "jenniferabc"
            },
            {
                "dn": "ou=fridiks_no,ou=organisations,o=fint",
                "name": "fridiks_no",
                "orgNumber": "931388975",
                "displayName": "Frid IKS",
                "components": [
                    "ou=administrasjon_organisasjon,ou=components,o=fint",
                    "ou=administrasjon_kodeverk,ou=components,o=fint",
                    "ou=administrasjon_fullmakt,ou=components,o=fint",
                    "ou=administrasjon_personal,ou=components,o=fint"
                ],
                "legalContact": "cn=28086339155,ou=contacts,o=fint",
                "techicalContacts": [],
                "k8sSize": null,
                "customer": false,
                "primaryAssetId": "fridiks.no"
            }] );
    }),
];
