'use strict';

import React from 'react';
import {debounce} from 'lodash';

class MovieItem extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let ref = this.refs.movieItem;
    let pid = this.props.pid;

    const leftHandler = this.props.leftHandler ? debounce(this.props.leftHandler, 150) : this.props.leftHandler;
    const rightHandler = this.props.rightHandler ? debounce(this.props.rightHandler, 150) : this.props.rightHandler;

    if (leftHandler && rightHandler) {
      var hammertime = new Hammer(React.findDOMNode(ref), {});
      hammertime.on('swipe', function(ev) {
        let elem = ev.target;
        while (elem.className !== 'movieitem') {
          elem = elem.parentElement;
        }

        if (ev.direction === Hammer.DIRECTION_LEFT) {
          leftHandler(elem, pid);
        }
        else if (ev.direction === Hammer.DIRECTION_RIGHT) {
          rightHandler(elem, pid);
        }
      });
      hammertime.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL});
    }
  }

  render() {
    const imageUrl = this.props.imageUrl || 'http://dummyimage.com/100x100/000/fff.png';
    const title = this.props.title || 'Title';

    return (
      <div className="movieitem" ref='movieItem' >
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
  leftHandler: React.PropTypes.func,
  rightHandler: React.PropTypes.func
};

export default MovieItem;
