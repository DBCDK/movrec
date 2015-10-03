'use strict';

import React from 'react';

class MovieItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const imageUrl = this.props.imageUrl || 'http://dummyimage.com/100x100/000/fff.png';
    const title = this.props.title || 'Title';
    const creator = this.props.creator || 'Creator';

    return (
      <div className="movieitem" >
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
  imageUrl: React.PropTypes.string
};

export default MovieItem;
