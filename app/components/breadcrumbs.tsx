import {useLocation} from "react-router";
import {Link} from "@remix-run/react";

export default function Breadcrumbs(){
    const location = useLocation();
    console.log(location)

    const homeLink = "/"
    let currentLink = ''

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {

            currentLink += `/${crumb}`

            return(
                <div className='crumb' key='crumb' >
                    <Link to={homeLink}>Dashboard</Link>
                    <Link to={currentLink}>{crumb}</Link>
                </div>
            )
        })

    return(
        <div className='breadcrumbs'>
            {crumbs}
        </div>
    )
}