'use strict';

import React from 'react';

import MovieItemContainerComponent from './MovieItemContainer.component.js';
import MovieItem from '../MovieItem/MovieItem.component.js';

class VerticalMovieItemContainerComponent extends MovieItemContainerComponent {
  constructor(){
    super();

    this.self = this;
  }

  componentDidMount() {
    this.refs.movieItemContainer.addEventListener("scroll", this.onPageScroll);
  }

  getMovieItems(movies) {
    return movies.map((val, idx) => {
      return (
        <div className='row'>
          <div className=''>
            <MovieItem title={val.title} key={idx} />
          </div>
        </div>
      );
    });
  }

  onPageScroll() {
    console.log('scroll');
  }

  render() {
    return (
      <div className='vertical-movie-item-container' ref='movieItemContainer'>
        {this.getMovieItems(this.state.movies)}
      </div>
    );
  }
}

export default VerticalMovieItemContainerComponent;
