import * as axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getFutureProductions = (limit) => {
  return axios({
    method: 'get',
    url: `${API_URL}api/future/production/offers`,
    params: {
      limit,
      populate: 'image',
      sort: '-createdAt',
    },
  })
    .then((resp) => resp.data);
};

export const getFutureProductionsById = (id) => {
  return axios({
    method: 'get',
    url: `${API_URL}api/future/production/offers/${id}`,
  })
    .then((resp) => resp.data);
};

export const getProductions = (limit) => {
  return axios({
    method: 'get',
    url: `${API_URL}api/tokenmarketplaces`,
    params: {
      limit,
      sort: '-createdAt',
    },
  })
    .then((resp) => resp.data);
};

export default {
  getFutureProductions,
  getProductions,
};
