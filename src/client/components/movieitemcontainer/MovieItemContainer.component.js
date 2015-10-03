'use strict';

import React, {PropTypes} from 'react';
import {isEmpty} from 'lodash';

class MovieItemContainerComponent extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: []
    };
  }

  componentWillMount() {
    this.state.movies = isEmpty(this.state.movies) ? this.props.movies : this.state.movies;
  }
}

MovieItemContainerComponent.displayName = 'MovieItemContainerComponent';
MovieItemContainerComponent.propTypes = {
  isAutoScrolling: PropTypes.bool,
  position: PropTypes.number.isRequired,
  movies: PropTypes.object,
  addToLikes: PropTypes.func,
  addToDislikes: PropTypes.func
};

export default MovieItemContainerComponent;
