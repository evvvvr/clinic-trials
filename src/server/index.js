import express from 'express';
import AppDefaults from './AppDefaults';

const port = process.env.PORT || AppDefaults.Port;
const app = express();

app.use(express.static('./public'));

console.log('Starting server...\n');

app.listen(port, () => {
  console.log(`Listening on port ${port}\n`);
});
