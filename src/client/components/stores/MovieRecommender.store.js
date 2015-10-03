'use strict';

import Reflux from 'reflux';
import {each} from 'lodash';

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
    this.parseResponse(response, 'recommendations');
  },

  onLikeMovie(likes, dislikes) {
    this.getRecommendations(likes, dislikes);
  },

  onDislikeMovie(dislikes, likes) {
    this.getRecommendations(likes, dislikes);
  },

  onRandomMovieRecommendationsResponse(response) {
    this.parseResponse(response, 'random');
  },

  getRecommendations(likes, dislikes) {
    let _likes = [];
    let _dislikes = [];

    each(likes, (like) => {
      _likes.push(like.pid);
    });

    each(dislikes, (dislike) => {
      _dislikes.push(dislike.pid);
    });

    MovieRecommenderActions.movieRecommendationsRequest({like:_likes, dislike: _dislikes});
  },

  parseResponse(response, target) {
    const result = this.store[target];
    response.result.forEach((movie) => {
      const pid = movie[0];
      const data = movie[1];
      data.pid = pid;
      result[pid] = data;
    });


    this.store[target] =  result;
    this.trigger(this.store);
  }
});

export default MovieRecommenderStore;
