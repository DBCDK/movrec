'use strict';

import React from 'react';
import {DragSource} from 'react-dnd';
import {debounce} from 'lodash';


/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return {
      imageUrl: props.imageUrl,
      title: props.title,
      pid: props.pid
    };
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class MovieItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const imageUrl = this.props.imageUrl || 'http://dummyimage.com/190x150/000/fff.png';
    const title = this.props.title || 'Title';
    const isDragging = this.props.isDragging;
    const connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <div className="movieitem" style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div className="movieitem--image-container" >
          <img className="movieitem--image-container--image" src={imageUrl} />
        </div>
        <div className="movieitem--title-container" >
          <span className="movieitem--title-container--title" >{title}</span>
        </div>
      </div>
    );
  }
}

MovieItem.displayName = 'MovieItem';
MovieItem.propTypes = {
  title: React.PropTypes.string,
  creator: React.PropTypes.string,
  imageUrl: React.PropTypes.string,
  pid: React.PropTypes.string,
  // Injected by React DnD
  isDragging: React.PropTypes.bool.isRequired,
  connectDragSource: React.PropTypes.func.isRequired
};

export default DragSource('MovieItem', cardSource, collect)(MovieItem);
