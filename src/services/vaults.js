import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

export default function getVaults() {
  return axios({
    method: 'GET',
    url: `${REACT_APP_API_URL}/vaults`,
    params: { populate: 'image' },

  })
    .then((response) => response.data);
}
