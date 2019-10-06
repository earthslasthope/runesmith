import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './navigation';
import apps from '../../shared/app-structure';
import * as pages from './pages';

const App = () => {
    return <>
        <Navigation />
        <div className="main">
            <Switch>
                {apps.map(app => {
                    const AppComponent = pages[app.identifier]; 
                    return <Route path={`/${app.identifier}`} key={app.identifier} component={AppComponent} />
                })}
            </Switch>
        </div>
    </>
}

export default App;