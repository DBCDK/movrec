'use strict';

import React from 'react';
import {each} from 'lodash';

import MovieItemContainerComponent from './MovieItemContainer.component.js';
import MovieItem from '../MovieItem/MovieItem.component.js';

class VerticalMovieItemContainerComponent extends MovieItemContainerComponent {
  constructor() {
    super();

    this.self = this;
  }

  componentDidMount() {
    // this.refs.movieItemContainer.addEventListener("scroll", this.onPageScroll);
  }

  getMovieItems(movies) {
    let movieItems = [];
    each(movies, (val, key) => {
      console.log(key);
      movieItems.push((
        <div className='row' >
          <div className='' >
            <MovieItem title={val.title} key={key} />
          </div>
        </div>
      ));
    });

    return movieItems;
  }

  onPageScroll() {
    console.log('scroll');
  }

  render() {
    return (
      <div className='vertical-movie-item-container' ref='movieItemContainer' >
        {this.getMovieItems(this.props.movies)}
      </div>
    );
  }
}

export default VerticalMovieItemContainerComponent;
