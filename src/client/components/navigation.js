import React from 'react';
import { Link } from 'react-router-dom';
import apps from '../../shared/app-structure';

const Navigation = () => {
    return <nav>
        <ul>
            {apps.map(app => <li key={app.identifier}>
                <Link to={`/${app.identifier}`}>{app.title}</Link>
            </li>)}
        </ul>
    </nav>
}

export default Navigation;