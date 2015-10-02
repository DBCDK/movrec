'use strict';

import React from 'react';

import MovieItemContainerComponent from '../movieitemcontainer/MovieItemContainer.component.js';

class FrontPageContainer extends React.Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='show-for-medium-up'>
            <div className='large-4 medium-4 columns'>
              <h2>Likes!</h2>
              <MovieItemContainerComponent />
            </div>

            <div className='large-4 medium-4 columns'>
              <h2>MovieRec!</h2>
              <MovieItemContainerComponent isAutoScrolling={true} />
            </div>

            <div className='large-4 medium-4 columns'>
              <h2>Dislikes!</h2>
              <MovieItemContainerComponent />
            </div>
          </div>

          <div className='show-for-small-only'>
            <div>
              <h1>Din skærm er for lille!</h1>
              <h4>For den optimale oplevelse skal du bruge en større skærm!</h4>
            </div>
          </div>
        </div>

        <div className='show-for-medium-up pull-to-bottom'>
          <div className='row'>
            <h2 className='text-center'>Vi anbefaler</h2>
            <MovieItemContainerComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default FrontPageContainer;
