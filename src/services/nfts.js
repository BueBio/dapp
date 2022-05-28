import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

export default function getNfts({ params }) {
  return axios({
    method: 'GET',
    url: `${REACT_APP_API_URL}/nfts`,
    params,
  })
    .then((response) => response.data);
}
