import {useLocation} from "react-router";
import {Link} from "@remix-run/react";
import { ChevronRightIcon } from '@navikt/aksel-icons';
import styled from "styled-components";

const StyledChevronRightIcon = styled(ChevronRightIcon)`
  vertical-align: middle;
`;

export default function Breadcrumbs(){
    const location = useLocation();

    let currentLink = ''
    const homeLink = '/'
    const linkStyle = {textDecoration: 'none'}

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {

            currentLink += `/${crumb}`

            return(
                // <div className='crumb' key='crumb' >

                  <Link to={currentLink} style={linkStyle} key={currentLink}>
                      <StyledChevronRightIcon title="Skriv ut dokument" />
                      {crumb}
                  </Link>
                // </div>
            )
        })

    return(
        <div className='breadcrumbs'>
            <Link to={homeLink} style={linkStyle}>{'Dashboard'}</Link>
            {crumbs}
        </div>
    )
}