'use strict';

import http from 'http';
import path from 'path';

import express from 'express';
import compression from 'compression';
import socketio from 'socket.io';
import ServiceProvider from 'dbc-node-serviceprovider';
import Logger from 'dbc-node-logger';

// Serviceclient and Transforms
import * as MovieRecommenderClient from './clients/movierecommendations.client';
import * as MovieRecommenderTransform from './transforms/MovieRecommendations.transform';
import * as RandomMovieRecommenderTransform from './transforms/RandomMovieRecommendations.transform';

const app = express();
const server = http.Server(app);
const socket = socketio.listen(server);
const ENV = app.get('env');
const logger = new Logger({app_name: 'movrec'});
const RecommenderConfig = {
  recommend: {
    endpoint: 'http://xp-p01.dbc.dk:8014/' || process.env.RECOMMENDER_URL
  }
};

app.set('port', process.env.PORT || 8012); // eslint-disable-line no-process-env

const provider = ServiceProvider({services: RecommenderConfig}, logger);
provider.registerServiceClient(MovieRecommenderClient);
provider.registerTransform(MovieRecommenderTransform);
provider.registerTransform(RandomMovieRecommenderTransform);
provider.setupSockets(socket);

// Configure templating
app.set('views', path.join(__dirname, './templates'));
app.set('view engine', 'jade');

// setting proxy
app.enable('trust proxy');

const fileHeaders = {index: false, dotfiles: 'ignore', maxAge: '1d'};

// adding gzip'ing
app.use(compression());

// setting paths
app.use(express.static(path.join(__dirname, '../../public'), fileHeaders));
app.use(express.static(path.join(__dirname, '../client/static'), fileHeaders));


app.get('/', (req, res) => {
  res.render('layout');
});

// starting server
server.listen(app.get('port'), () => {
  logger.log('debug', 'Server listening on port ' + app.get('port'));
});
