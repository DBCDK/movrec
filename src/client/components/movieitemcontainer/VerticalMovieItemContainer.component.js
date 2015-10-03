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

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props) !== JSON.stringify(nextProps));
  }

  getMovieItems(movies) {
    let movieItems = [];

    each(movies, (val, key) => {
      movieItems.push((
        <div className='row' key={key}>
          <div className='' >
            <MovieItem title={val.title} imageUrl={val.imageUrl} />
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
