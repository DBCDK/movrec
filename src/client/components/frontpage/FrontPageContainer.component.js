'use strict';

import React from 'react';

// Stores
import MovieRecommenderStore from '../stores/MovieRecommender.store';

// Components
import MovieItemContainerComponent from '../movieitemcontainer/MovieItemContainer.component.js';
import HorizontalMovieItemContainerComponent from '../movieitemcontainer/HorizontalMovieItemContainer.component.js';
import VerticalMovieItemContainerComponent from '../movieitemcontainer/VerticalMovieItemContainer.component.js';

class FrontPageContainer extends React.Component {

  constructor() {
    super();

    this.state = {random: {}, recommendations: {}};
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
    const recommendations = (JSON.stringify(this.state.recommendations) !== JSON.stringify(nextState.recommendations));
    return (random || recommendations);
  }

  render() {
    const randomRecommendations = this.state.random;
    const movies = {};

    return (
      <div className='container' >
        <div className='row' >
          <div className='show-for-medium-up' >
            <div className='large-4 medium-4 columns' >
              <h2>Likes!</h2>
              <div className='movie-item-container--container' >
                <VerticalMovieItemContainerComponent movies={movies} width={1} />
              </div>
            </div>

            <div className='large-4 medium-4 columns' >
              <h2>MovieRec!</h2>
              <div className='movie-item-container--container' >
                <VerticalMovieItemContainerComponent movies={randomRecommendations} isAutoScrolling={true} width={1} />
              </div>
            </div>

            <div className='large-4 medium-4 columns' >
              <h2>Dislikes!</h2>
              <div className='movie-item-container--container' >
                <VerticalMovieItemContainerComponent movies={movies} width={1} />
              </div>
            </div>
          </div>

          <div className='show-for-small-only' >
            <div>
              <h1>Din skærm er for lille!</h1>
              <h4>For den optimale oplevelse skal du bruge en større skærm!</h4>
            </div>
          </div>
        </div>

        <div className='show-for-medium-up pull-to-bottom' >
          <div className='row' >
            <h2 className='text-center' >Vi anbefaler</h2>
            <HorizontalMovieItemContainerComponent movies={movies} movieItemCssClasses={'large-2 medium-2'} />
          </div>
        </div>
      </div>
    );
  }
}

export default FrontPageContainer;
