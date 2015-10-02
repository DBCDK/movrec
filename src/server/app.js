'use strict';

import http from 'http';
import path from 'path';

import express from 'express';
import compression from 'compression';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const socket = socketio.listen(server);
const ENV = app.get('env');

app.set('port', process.env.PORT || 8012); // eslint-disable-line no-process-env

// Configure templating
app.set('views', path.join(__dirname, 'server/templates'));
app.set('view engine', 'jade');

// setting proxy
app.enable('trust proxy');

const fileHeaders = {index: false, dotfiles: 'ignore', maxAge: '1d'};

// adding gzip'ing
app.use(compression());

// setting paths
app.use(express.static(path.join(__dirname, '../public'), fileHeaders));
app.use(express.static(path.join(__dirname, '../static'), fileHeaders));

// starting server
server.listen(app.get('port'), () => {
  console.log('debug', 'Server listening on port ' + app.get('port'));
});
