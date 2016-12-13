import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import AppDefaults from './AppDefaults';
import v1 from './routes/api/v1/api';

const port = process.env.PORT || AppDefaults.Port;
const app = express();

app.use(express.static('./public'));
app.get('*', (request, response) => {
  response.sendFile(path.resolve('./public', 'index.html'));
});

app.use('/api', bodyParser.json());
app.use('/api', v1);
app.use('/api/v1', v1);

console.log('Starting server...\n');

app.listen(port, () => {
  console.log(`Listening on port ${port}\n`);
});
