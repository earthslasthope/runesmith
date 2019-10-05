import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('y0');
});

app.listen(1337, () => {
    console.log('Running the app on http://localhost:3000');
});