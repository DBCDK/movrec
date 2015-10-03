'use strict';

const MovieRecommendationsTransform = {
  event() {
    return 'getMovieRecommendations';
  },

  requestTransform(event, params) {
    return this.callServiceClient('recommend', 'getMovieRecommendations', params);
  },

  responseTransform(data) {
    return data;
  }
};

export default MovieRecommendationsTransform;
