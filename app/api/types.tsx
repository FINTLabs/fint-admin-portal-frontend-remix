export interface IComponent {
    dn: string;
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

export const defaultComponent: IComponent = {
    dn: '',
    name: '',
    description: '',
    basePath: '',
    openData: false,
    common: false,
    core: false,
    inPlayWithFint: false,
    inBeta: false,
    inProduction: false,
};

export interface IContact {
    dn: string;
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

export const defaultContact: IContact = {
    dn: '',
    nin: '',
    firstName: '',
    lastName: '',
    mail: '',
    mobile: '',
    technical: null,
    legal: null,
    supportId: null,
    roles: null,
};

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

export const defaultOrganization: IOrganization = {
    dn: "",
    name: "",
    orgNumber: "",
    displayName: "",
    components: [],
    legalContact: "",
    techicalContacts: [],
    k8sSize: null,
    customer: false,
    primaryAssetId: "",
};

export interface ITemplate {
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

export interface IErrorState {
    [key: string]: string | undefined;
}

export interface IFetcherResponseData {
    show: boolean;
    message: string;
    variant: "error" | "info" | "warning" | "success";
}

export interface ILoaderData {
    displayName: {
        fullName: string;
    };
}