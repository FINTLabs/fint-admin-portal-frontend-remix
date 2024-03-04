import React from "react";
import { Link } from "@remix-run/react";
import { ChevronRightIcon, HouseIcon } from '@navikt/aksel-icons';
import styled from "styled-components";

interface BreadcrumbItem {
    name: string;
    link: string;
}

interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbItem[];
}

const StyledChevronRightIcon = styled(ChevronRightIcon)`
    vertical-align: middle;
`;

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
    const homeLink = '/';
    const linkStyle = { textDecoration: 'none' };

    const translateNameToNorwegian = (name: string): string => {
        const translations: Record<string, string> = {
            'Dashboard': 'Dashbord',
        };
        return translations[name] || name;
    };

    const crumbs = breadcrumbs.map(({ name, link }) => (
        <Link to={link} style={linkStyle} key={link}>
            <StyledChevronRightIcon title="Spacer" />
            {translateNameToNorwegian(name)}
        </Link>
    ));

    return (
        <div className='breadcrumbs'>
            <Link to={homeLink} style={linkStyle}>
                <HouseIcon title="a11y-title" />{translateNameToNorwegian('Dashboard')}
            </Link>
            {crumbs}
        </div>
    );
}
