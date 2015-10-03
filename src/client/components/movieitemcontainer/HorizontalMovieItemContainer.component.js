'use strict';

import MovieItemContainerComponent from './MovieItemContainer.component.js';
import MovieItem from '../MovieItem/MovieItem.component.js';

class HorizontalMovieItemContainerComponent extends MovieItemContainerComponent {
  constructor(){
    super();
  }

  getMovieItems(movies) {
    return movies.map((val, idx) => {
      return (
        <li key={idx}>
          <MovieItem title={val.title} />
        </li>
      );
    });
  }

  render() {
    return (
      <ul className='horizontal-movie-item-container' ref='movieItemContainer'>
        {this.getMovieItems(this.state.movies)}
      </ul>
    );
  }
}

export default HorizontalMovieItemContainerComponent;
