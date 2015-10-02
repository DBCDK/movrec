'use strict';

import React, {PropTypes} from 'react';

class MovieItemContainerComponent extends React.Component {

  constructor(){
    super();
  }

  render() {
    return <div>movies go here!</div>;
  }
}

MovieItemContainerComponent.displayName = 'MovieItemContainerComponent';
MovieItemContainerComponent.propTypes = {
  isAutoScrolling: PropTypes.bool
};

export default MovieItemContainerComponent;
