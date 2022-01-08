import axios from 'axios';
import {APIRoute, API_KEY, REQUEST_TIMEOUT, BACKEND_URL} from '../const'

export const fetchCity = (name, locationCallback, weatherCallback, errorNameCallback, errorCallback) => {
  axios({
    method: 'get',
    url: `${BACKEND_URL}${APIRoute.Search}?apikey=${API_KEY}&q=${name}`,
    timeout: REQUEST_TIMEOUT,
  })
    .then(function (response) {
      const data = response.data;

      if (data.length === 0) {
        errorNameCallback();
      } else {
        locationCallback(data);

        axios({
          method: 'get',
          url: `${BACKEND_URL}${APIRoute.Forecast}${data[0].Key}?apikey=${API_KEY}`,
          timeout: REQUEST_TIMEOUT,
        })
          .then(function (response) {
            const data = response.data;
            weatherCallback(data);
          })
          .catch(errorCallback);
      }
    })
    .catch(errorCallback);
}
