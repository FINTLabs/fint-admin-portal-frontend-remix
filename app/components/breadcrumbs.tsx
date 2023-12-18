import React from "react";
import { Link } from 'react-router-dom';

interface BreadCrumbs {
    lable: String;
    path: String;
}

interface BreadCrumbsProps{
    paths: BreadCrumbs[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ paths }) => (
    <div>
        {paths.map((path, index) => (
            <span key={path.lable}>
                <Link to={path.path}>{path.lable}</Link>
                {index < paths.length - 1 && <span>  </span> }
            </span>
    ))}
</div>
);
export default BreadCrumbs;