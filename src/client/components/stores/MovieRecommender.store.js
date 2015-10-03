'use strict';

import Reflux from 'reflux';

// Actions
import MovieRecommenderActions from '../actions/MovieRecommender.action';

const MovieRecommenderStore = Reflux.createStore({
  store: {
    random: [],
    recommendations: []
  },

  init() {
    this.listenToMany(MovieRecommenderActions);
    MovieRecommenderActions.randomMovieRecommendationsRequest();
  },

  onMovieRecommendationsResponse(response) {
    console.log('onMovieRecommendationsResponse');
  },

  onRandomMovieRecommendationsResponse(response) {
    console.log('onRandomMovieRecommendationsResponse');
    this.store.random =  response.result;
    this.trigger(this.store);
  }
});

export default MovieRecommenderStore;
