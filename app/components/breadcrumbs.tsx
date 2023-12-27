import {useLocation} from "react-router";
import {Link} from "@remix-run/react";

export default function Breadcrumbs(){
    const location = useLocation();

    let currentLink = ''

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {

            currentLink += `/${crumb}`

            return(
                <div className='crumb' key='crumb' >
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