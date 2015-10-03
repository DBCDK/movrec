'use strict';

const MovieRecommendationsTransform = {
  event() {
    return 'getRandomMovieRecommendations';
  },

  requestTransform(event, params) {
    return this.callServiceClient('recommend', 'getRandomMovieRecommendations', params);
  },

  responseTransform(data) {
    return data;
  }
};

export default MovieRecommendationsTransform;
