'use strict';

const MovieRecommendationsTransform = {
  event() {
    return 'getMovieRecommendations';
  },

  requestTransform(event, params) {
    return this.callServiceClient('recommend', 'getRandomMovieRecommendations', params);
  },

  responseTransform(data) {
    console.log(arguments);
    return data;
  }
};

export default MovieRecommendationsTransform;
