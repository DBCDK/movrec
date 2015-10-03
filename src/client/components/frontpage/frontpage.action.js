'use strict';

import Reflux from 'reflux';
import SocketClient from 'dbc-node-serviceprovider-socketclient';

const getMovieRecommendations = SocketClient('getMovieRecommendations');
const getRandomMovieRecommendations = SocketClient('getRandomMovieRecommendations');

const RecommenderActions = Reflux.createActions([
  'movieRecommendationsRequest',
  'movieRecommendationsResponse',
  'randomMovieRecommendationsRequest',
  'randomMovieRecommendationsResponse',
]);

RecommenderActions.movieRecommendationsRequest.listen(getMovieRecommendations.request);
getMovieRecommendations.response(RecommenderActions.movieRecommendationsResponse);

RecommenderActions.randomMovieRecommendationsRequest.listen(getRandomMovieRecommendations.request);
getMovieRecommendations.response(RecommenderActions.randomMovieRecommendationsResponse);

export default RecommenderActions;
