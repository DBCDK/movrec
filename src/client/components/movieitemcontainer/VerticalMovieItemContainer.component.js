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
    console.log(this.props);
  }

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props) !== JSON.stringify(nextProps));
  }

  leftHandler() {
    let like = this.props.addToLikes;
    return (elem, pid) => {
      let leftcol = document.getElementsByClassName('vertical-movie-item-container container-number-1')[0];
      leftcol.insertBefore(elem, leftcol.firstChild);
      like(pid);
    }
  }

  rightHandler() {
    let dislike = this.props.addToDislikes;
    return (elem, pid) => {
      let rightcol = document.getElementsByClassName('vertical-movie-item-container container-number-3')[0];
      rightcol.insertBefore(elem, rightcol.firstChild);
      dislike(pid);
    }
  }

  getMovieItems(movies) {
    let movieItems = [];

    each(movies, (val, key) => {
      movieItems.push((
        <div className='row' key={key}>
          <div className='' >
            <MovieItem title={val.title} imageUrl={val.imageUrl} pid={val.pid} leftHandler={this.leftHandler()} rightHandler={this.rightHandler()} />
          </div>
        </div>
      ));
    });

    return movieItems;
  }

  render() {
    return (
      <div className={'vertical-movie-item-container container-number-' + this.props.position} ref='movieItemContainer'>
        {this.getMovieItems(this.props.movies)}
      </div>
    );
  }
}

export default VerticalMovieItemContainerComponent;
