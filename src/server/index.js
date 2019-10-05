import Express from 'express';
import path from 'path';
import React from 'react'
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../client/components/app';
import rootReducer from '../client/state/reducers/root';

const app = Express();
const port = 1337;

app.use('/build', Express.static(path.join(__dirname, '../client')));

app.use((req, res) => {
    const store = createStore(rootReducer);
    const initState = store.getState();

    const reactHtml = renderToString(
        <Provider store={store}>
            <App />
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
});

app.post('/api/repository', (req, res) => {

});

app.listen(port, () => {
    console.log(`Running the app on http://localhost:${port}`);
});