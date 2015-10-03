'use strict';

import {each} from 'lodash';

import MovieItemContainerComponent from './MovieItemContainer.component.js';
import MovieItem from '../MovieItem/MovieItem.component.js';

class HorizontalMovieItemContainerComponent extends MovieItemContainerComponent {
  constructor(){
    super();
  }

  getMovieItems(movies) {
    let movieItems = [];

    each(movies, (val, key) => {
      movieItems.push((
        <li key={key}>
          <a href={val.url} target="_blank">
            <MovieItem title={val.title} imageUrl={val.imageUrl} pid={val.pid} />
          </a>
        </li>
      ));
    });

    return movieItems;
  }

  render() {
    return (
      <ul className='horizontal-movie-item-container' ref='movieItemContainer'>
        {this.getMovieItems(this.props.movies)}
      </ul>
    );
  }
}

export default HorizontalMovieItemContainerComponent;
