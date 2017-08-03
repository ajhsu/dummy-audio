import express from 'express';
import cors from 'cors';
import path from 'path';
import favicon from 'serve-favicon';
import silentProviderMiddleware from './entries/silent-provider';
import config from './config';
import { fileLogger, stdoutLogger } from './logger';

const app = express();
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
// Apply CORS middleware
app.use(cors());
// Apply logger middleware
app.use(fileLogger);
app.use(stdoutLogger);

// Serve static audio files
app.use('/', express.static('public', { maxAge: 24 * 60 * 60 * 1000 }));
// M4A Trial Provider API
app.get('/silent', silentProviderMiddleware);
// Catch all other requests
app.get('*', (request, response) => {
  response.status(404).send('Not found');
});

app.listen(config.port, () => {
  console.log(`Node-server start to listen on port ${config.port}..`);
});
