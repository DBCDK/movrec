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
  'likeMovie',
  'dislikeMovie'
]);

RecommenderActions.movieRecommendationsRequest.listen(getMovieRecommendations.request);
getMovieRecommendations.response(RecommenderActions.movieRecommendationsResponse);

RecommenderActions.randomMovieRecommendationsRequest.listen(getRandomMovieRecommendations.request);
getRandomMovieRecommendations.response(RecommenderActions.randomMovieRecommendationsResponse);

export default RecommenderActions;
