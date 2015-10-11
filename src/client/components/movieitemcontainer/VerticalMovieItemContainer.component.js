'use strict';

import React from 'react';
import {each} from 'lodash';
import {DropTarget} from 'react-dnd';

import MovieItemContainerComponent from './MovieItemContainer.component.js';
import MovieItem from '../MovieItem/MovieItem.component.js';

import MovieRecommenderActions from '../actions/MovieRecommender.action';

const moviItemDropTarget = {
  canDrop(props, monitor) {
    return props.should !== 'cancel';
  },

  drop(props, monitor, component){
    const should = component.props.should;
    const pid = monitor.getItem().pid;

    switch (should) {
      case 'like':
        component.props.addToLikes(pid);
        break;
      case 'dislike':
        component.props.addToDislikes(pid);
        break
      default:
        return false;
        break;
    }

  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class VerticalMovieItemContainerComponent extends MovieItemContainerComponent {
  constructor() {
    super();

    this.self = this;
  }

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props) !== JSON.stringify(nextProps));
  }

  getMovieItems(movies) {
    let movieItems = [];

    each(movies, (val, key) => {
      movieItems.push((
        <div className='row' key={key} >
          <div className='' >
            <MovieItem title={val.title} imageUrl={val.imageUrl} pid={val.pid} />
          </div>
        </div>
      ));
    });

    return movieItems;
  }

  static loadMoreHandler() {
    MovieRecommenderActions.randomMovieRecommendationsRequest(25);
  }

  render() {
    const connectDropTarget = this.props.connectDropTarget;
    let loadMore = '';
    if (this.props.isAutoScrolling) {
      loadMore = (
        <div>
          <a className='button expand' onClick={this.loadMoreHandler} >
            Load Flere film!
          </a>
        </div>
      );
    }

    let classNames = 'vertical-movie-item-container container-number-' + this.props.position;
    classNames += this.props.isOver && this.props.canDrop ? ' is-over' : '';

    return connectDropTarget(
      <div className={classNames} >
        {this.getMovieItems(this.props.movies)}
        <br />
        {loadMore}
      </div>
    );
  }
}

VerticalMovieItemContainerComponent.displayName = 'VerticalMovieItemContainerComponent';

export default DropTarget('MovieItem', moviItemDropTarget, collect)(VerticalMovieItemContainerComponent);
