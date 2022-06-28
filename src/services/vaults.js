import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

export function getVaults() {
  return axios({
    method: 'GET',
    url: `${REACT_APP_API_URL}/vaults`,
    params: { populate: 'image' },
  })
    .then((response) => response.data);
}

export function getVaultById(vaultId) {
  return axios({
    method: 'GET',
    url: `${REACT_APP_API_URL}/vaults/${vaultId}`,
    params: {
      populate: 'image',
    },
  })
    .then((response) => response.data);
}

export function deposit(data) {
  return axios({
    method: 'POST',
    url: `${REACT_APP_API_URL}/deposit`,
    data,
  })
    .then((response) => response.data);
}

export function withdraw(data) {
  return axios({
    method: 'POST',
    url: `${REACT_APP_API_URL}/withdraw`,
    data,
  })
    .then((response) => response.data);
}

export function getWalletVault(vaultId, walletAddress) {
  return axios({
    method: 'GET',
    url: `${REACT_APP_API_URL}/walletvaults`,
    params: {
      conditions: {
        vault: vaultId,
        address: walletAddress,
      },
    },
  })
    .then((response) => response.data);
}
