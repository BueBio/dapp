import * as axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const claimCoupon = (code, wallet) => {
  return axios({
    method: 'post',
    url: `${API_URL}api/tokens/impacttoken/assign`,
    data: {
      code,
      wallet,
    },
  })
    .then((resp) => resp.data);
};

export const codeValidation = (code) => {
  return axios({
    method: 'get',
    url: `${API_URL}api/codes/validate/${code}`,
  })
    .then((resp) => resp.data);
};

export default {
  claimCoupon,
  codeValidation,
};
