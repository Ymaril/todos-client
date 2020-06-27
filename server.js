const express = require('express');
const app = express();

app.use(express.static('./dist/todos-client/'));

app.get('/*', (req, res) => res.sendFile('index.html', {root: 'dist/todos-client/'}));

app.listen(process.env.PORT || 8080);
