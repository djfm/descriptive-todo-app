import 'babel-polyfill';
import express from 'express';
import {join} from 'path';

const app = express();

app.use(express.static(join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const server = app.listen(process.env.PORT || 3000, () => {
    const {address, port} = server.address();
    console.log('Awwwright! Running on %s:%s.', address, port);
});
