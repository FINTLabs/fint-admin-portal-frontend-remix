import {useLocation} from "react-router";
import {Link} from "@remix-run/react";

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
                <div className='crumb' key='crumb' >
                    <Link to={currentLink} style={linkStyle}>{crumb}</Link>
                </div>
            )
        })

    return(
        <div className='breadcrumbs'>
            <Link to={homeLink} style={linkStyle}>{'Dash board'}</Link>
            {crumbs}
        </div>
    )
}