import Express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import React from 'react'
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from '../client/components/app';
import rootReducer from '../client/state/reducers/root';
import apps from '../shared/app-structure';
import * as repos from './repositories';

const app = Express();
const port = 1337;

const defaultApp = apps.find(app => app.default);

app.use('/build', Express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

app.get('', (req, res) => {
    serveApp(defaultApp)(req, res);
});

app.get('/:app', (req, res) => {
    const selectedApp = getAppByIdentifier(req.params.app);

    if (!selectedApp) {
        res.status(404);
        res.send();
    }
    else {
        serveApp(selectedApp)(req, res);
    }
});

const getAppByIdentifier = (identifier) => {
    return apps.find(x => x.identifier === identifier);
}

const serveApp = (app) => (req, res) => {
    const { 
        [app.identifier]: {
            getAll = () => new Promise(resolve => resolve([]))
        } = {}
    } = repos;

    getAll().then(serverData => {
        const store = createStore(rootReducer, {
            [app.identifier]: { serverData }
        });
        const initState = store.getState();

        const reactHtml = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <App />
                </StaticRouter>
            </Provider>
        );
    
        const html = `
            <!doctype html>
            <html>
            <head>
                <title>Runesmith - Software Developer</title>
            </head>
            <body>
                <div id="root">${reactHtml}</div>
                <script>
                // WARNING: See the following for security issues around embedding JSON in HTML:
                // http://redux.js.org/recipes/ServerRendering.html#security-considerations
                window.__PRELOADED_STATE__ = ${JSON.stringify(initState).replace(
                    /</g,
                    '\\u003c'
                )}
                </script>
                <script src="/build/main.js"></script>
            </body>
            </html>
        `;
    
        res.send(html);
    })
}

app.post('/api/repository', (req, res) => {
    const { appIdentifier } = req.body;

    const { 
        [appIdentifier]: {
            getAll = () => new Promise(resolve => resolve([]))
        } = {}
    } = repos;

    getAll().then(serverData => {
        res.send(serverData);
    }, error => {
        res.status(401);
        res.send(error);
    })
});

app.listen(port, () => {
    console.log(`Running the app on http://localhost:${port}`);
});