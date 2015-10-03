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
        <div className='row' key={key}>
          <div className='' >
            <MovieItem title={val.title} imageUrl={val.imageUrl} pid={val.pid} />
          </div>
        </div>
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
