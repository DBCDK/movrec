'use strict';

import React from 'react';
import {indexOf} from 'lodash';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

// Stores
import MovieRecommenderStore from '../stores/MovieRecommender.store';

// Components
import MovieItemContainerComponent from '../movieitemcontainer/MovieItemContainer.component.js';
import HorizontalMovieItemContainerComponent from '../movieitemcontainer/HorizontalMovieItemContainer.component.js';
import VerticalMovieItemContainerComponent from '../movieitemcontainer/VerticalMovieItemContainer.component.js';

import MovieRecommenderActions from '../actions/MovieRecommender.action.js';

class FrontPageContainer extends React.Component {

  constructor() {
    super();

    this.state = {random: {}, recommendations: {}, likes: {}, dislikes: {}};
  }

  componentDidMount() {
    this.unsubscribe = [
      MovieRecommenderStore.listen(() => this.gotRecommendations())
    ];
  }

  componentWillUnmount() {
    this.unsubscribe.forEach(
      (unsubscriber) => {
        unsubscriber();
      }
    );
  }

  gotRecommendations() {
    this.setState({random: MovieRecommenderStore.store.random, recommendations: MovieRecommenderStore.store.recommendations});
  }

  shouldComponentUpdate(nextProps, nextState) {
    const random = (JSON.stringify(this.state.random) !== JSON.stringify(nextState.random));
    let recommendations = (JSON.stringify(this.state.recommendations) !== JSON.stringify(nextState.recommendations));
    recommendations = true;
    return (random || recommendations);
  }

  likeFunction() {
    let likes = this.state.likes;
    let dislikes = this.state.dislikes;
    let random = this.state.random;
    let recommendations = this.state.recommendations;

    return (pid) => {
      if (dislikes[pid]) {
        likes[pid] = dislikes[pid];
        delete dislikes[pid];
      }
      if (random[pid]) {
        likes[pid] = random[pid];
        delete random[pid];
      }
      if (recommendations[pid]) {
        likes[pid] = recommendations[pid];
        delete recommendations[pid];
      }

      MovieRecommenderActions.likeMovie(likes, dislikes);
    };
  }

  dislikeFunction() {
    let likes = this.state.likes;
    let dislikes = this.state.dislikes;
    let random = this.state.random;
    let recommendations = this.state.recommendations;

    return (pid) => {
      if (likes[pid]) {
        dislikes[pid] = likes[pid];
        delete likes[pid];
      }
      if (random[pid]) {
        dislikes[pid] = random[pid];
        delete random[pid];
      }
      if (recommendations[pid]) {
        dislikes[pid] = recommendations[pid];
        delete recommendations[pid];
      }

      MovieRecommenderActions.dislikeMovie(dislikes, likes);
    };
  }

  cancelLikeOrDislike() {
    let likes = this.state.likes;
    let dislikes = this.state.dislikes;
    let random = this.state.random;
    let recommendations = this.state.recommendations;

    return (pid) => {
      if (likes[pid]) {
        delete likes[pid];
      }
      if (random[pid]) {
        dislikes[pid] = random[pid];
        delete random[pid];
      }
      if (recommendations[pid]) {
        dislikes[pid] = recommendations[pid];
        delete recommendations[pid];
      }

      MovieRecommenderActions.dislikeMovie(dislikes, likes);
    };
  }

  render() {
    let randomRecommendations = this.state.random;
    let recommendations = this.state.recommendations;
    let likes = this.state.likes;
    let dislikes = this.state.dislikes;

    return (
      <div className='container' >
        <div className='row' >
          <div className='show-for-medium-up' >
            <div className='large-4 medium-4 columns' >
              <h4 className='text-center'>Fin film</h4>
              <div className='movie-item-container--container' >
                <VerticalMovieItemContainerComponent
                  movies={likes}
                  position={1}
                  should={'like'}
                  addToLikes={this.likeFunction()}
                  addToDislikes={this.dislikeFunction()} />
              </div>
            </div>

            <div className='large-4 medium-4 columns' >
              <h4 className='text-center'>Forslag</h4>
              <div className='movie-item-container--container'>
                <VerticalMovieItemContainerComponent
                  movies={randomRecommendations}
                  isAutoScrolling={true}
                  position={2}
                  should={'cancel'}
                  addToLikes={this.likeFunction()}
                  addToDislikes={this.dislikeFunction()} />
              </div>
            </div>

            <div className='large-4 medium-4 columns' >
              <h4 className='text-center'>Ikke så fin film</h4>
              <div className='movie-item-container--container' >
                <VerticalMovieItemContainerComponent
                  movies={dislikes}
                  position={3}
                  should={'dislike'}
                  addToLikes={this.likeFunction()}
                  addToDislikes={this.dislikeFunction()} />
              </div>
            </div>
          </div>

          <div className='show-for-small-only' >
            <div>
              <h4>Din skærm er for lille!</h4>
              <h4>For den optimale oplevelse skal du bruge en større skærm!</h4>
              <img src="https://en.gravatar.com/userimage/23206348/9d3694eac224757ca3636779f4f3b79e.jpg?size=400" />
            </div>
          </div>
        </div>

        <div className='show-for-medium-up pull-to-bottom' >
          <div className='row'>
            <h3 className='text-center'>Anbefalinger</h3>
            <HorizontalMovieItemContainerComponent
              movies={recommendations}
              position= {4} />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(FrontPageContainer);
