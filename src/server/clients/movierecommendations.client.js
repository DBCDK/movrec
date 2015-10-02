'use strict';

import {Promise} from 'es6-promise';
import request from 'request';

let endpoint = null;


/**
 * Creates a new Profile in Loopback
 */
function getMovieRecommendations(params) {
  return new Promise((resolve) => {
    const url = endpoint + 'recommend';
    request.post(
      {
        url: url,
        json: {}
      }, (err, httpResponse) => {
        if (err){
          console.error('Some error occured while communicating with the recommender service', err);
        } else {
          resolve(httpResponse.body);
        }
      }
    );
  });
}

/**
 * Setting the necessary paramerters for the client to be usable.
 * The endpoint is only set if endpoint is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */
export function init(config = null) {

  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }
  endpoint = config.endpoint;
  return METHODS;
}

export const name = 'recommend';

export const METHODS = {
  getMovieRecommendations: getMovieRecommendations,
};
