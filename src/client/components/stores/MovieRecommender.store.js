'use strict';

import Reflux from 'reflux';

// Actions
import MovieRecommenderActions from '../actions/MovieRecommender.action';

const MovieRecommenderStore = Reflux.createStore({
  store: {
    random: {},
    recommendations: {}
  },

  init() {
    this.listenToMany(MovieRecommenderActions);
    MovieRecommenderActions.randomMovieRecommendationsRequest();
  },

  onMovieRecommendationsResponse(response) {
    console.log('onMovieRecommendationsResponse');
  },

  onRandomMovieRecommendationsResponse(response) {
    const random = this.store.random;
    response.result.forEach((movie) => {
      const pid = movie[0];
      const data = movie[1];
      data.pid = pid;
      random[pid] = data;
    });


    this.store.random =  random;
    this.trigger(this.store);
  }
});

export default MovieRecommenderStore;
