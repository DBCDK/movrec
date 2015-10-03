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

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props) !== JSON.stringify(nextProps));
  }

  leftHandler() {
    let like = this.props.addToLikes;
    let moveAnimate = this.moveAnimate;
    return (elem, pid) => {
      let leftcol = document.getElementsByClassName('vertical-movie-item-container container-number-1')[0];
      moveAnimate(elem, leftcol);
      like(pid);
    }
  }

  rightHandler() {
    let dislike = this.props.addToDislikes;
    let moveAnimate = this.moveAnimate;
    return (elem, pid) => {
      let rightcol = document.getElementsByClassName('vertical-movie-item-container container-number-3')[0];
      moveAnimate(elem, rightcol);
      dislike(pid);
    }
  }

  moveAnimate(element, newParent){
    element = $(element);
    newParent= $(newParent);

    var oldOffset = element.offset();
    element.appendTo(newParent);
    var newOffset = element.offset();

    var temp = element.clone().appendTo('body');
    temp.css({
      'position': 'absolute',
      'left': oldOffset.left,
      'top': oldOffset.top,
      'z-index': 1000
    });
    element.hide();
    temp.animate({'top': newOffset.top, 'left': newOffset.left}, 'fast', function(){
      element.show();
      temp.remove();
    });
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
