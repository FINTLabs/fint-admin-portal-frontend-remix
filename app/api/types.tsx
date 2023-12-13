export interface IComponent {
    dn: string;
    name: string;
    description: string;
    organisations: string[];
    clients: string[];
    adapters: string[];
    basePath: string;
    port: number | null;
    core: boolean;
    openData: boolean;
    common: boolean;
    dockerImage: string | null;
    componentSizes: string | null;
    cacheDisabledFor: string[];
    inProduction: boolean;
    inBeta: boolean;
    inPlayWithFint: boolean;
}

export interface IContact {
    dn?: string;
    nin: string;
    firstName: string;
    lastName: string;
    mail: string;
    mobile: string;
    technical?: string[] | null;
    legal?: string[] | null;
    supportId?: string | null;
    roles?: string[] | null;
}

export interface IOrganization {
    dn: string;
    name: string;
    orgNumber: string;
    displayName: string;
    components: string[];
    legalContact: string;
    techicalContacts: string[];
    k8sSize: number | null;
    customer: boolean;
    primaryAssetId: string;
}
