import {useLocation} from "react-router";
import {Link} from "@remix-run/react";
import {ChevronRightIcon, HouseIcon} from '@navikt/aksel-icons';
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
                  <Link to={currentLink} style={linkStyle} key={currentLink}>
                      <StyledChevronRightIcon title="Spacer" />
                      {crumb}
                  </Link>
            )
        })

    return(
        <div className='breadcrumbs'>
            <Link to={homeLink} style={linkStyle}>
                <HouseIcon title="a11y-title" />{'Dashboard'}
            </Link>
            {crumbs}
        </div>
    )
}