export interface IComponent {
    name: string;
    description: string;
    basePath: string;
    openData: boolean;
    common: boolean;
    core: boolean;
    inPlayWithFint: boolean;
    inBeta: boolean;
    inProduction: boolean;
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

export interface Template {
    dn: string;
    self: string;
    name: string;
    collection: string[];
    read: string[];
    modify: string[];
    clients: string[];
    components: string[];
    description: string;
}