/**
 * @author Pratish Shrestha <pratishshrestha@lftechnology.com>
 */

import axios from 'axios';

export function get(url) {
  return axios({
    method: 'get',
    url: url
  });
}
