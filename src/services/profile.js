import * as axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getCodesWallet = (wallet) => {
  return axios({
    method: 'get',
    url: `${API_URL}api/codes/wallet/${wallet}`,
  })
    .then((resp) => resp.data);
};

export const getFutureProductions = () => {
  return axios({
    method: 'get',
    url: `${API_URL}api/future/production/offers`,
    params: {
      populate: 'image producer',
      sort: '-createdAt',
    },
  })
    .then((resp) => resp.data);
};
