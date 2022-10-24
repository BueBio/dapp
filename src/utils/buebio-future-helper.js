import {
  Contract,
  providers,
} from 'ethers';
import buebioFuture from './buebio-future-abi.json';

const BUEBIO_FUTURE_ADDRESS = process.env.REACT_APP_CONTRACT_BUEBIO_FUTURE_ADDRESS;

export function buy(tokenId, amount, provider) {
  const providerContract = new providers.Web3Provider(provider);
  const signer = providerContract.getSigner();
  const contract = new Contract(BUEBIO_FUTURE_ADDRESS, buebioFuture, signer);
  return contract.buy(tokenId, amount);
}

export function balanceOfContract(tokenId) {
  const url = process.env.REACT_APP_BLOCKCHAIN_NETWORK_RPC;
  const providerContract = new providers.JsonRpcProvider(url);
  const contract = new Contract(BUEBIO_FUTURE_ADDRESS, buebioFuture, providerContract);
  return contract.balanceOf(BUEBIO_FUTURE_ADDRESS, tokenId);
}

export function getBalanceTokens(wallets, tokens, provider) {
  const providerContract = new providers.Web3Provider(provider);
  const contract = new Contract(BUEBIO_FUTURE_ADDRESS, buebioFuture, providerContract);
  return contract.balanceOfBatch(wallets, tokens)
    .then((balanceTokens) => {
      return balanceTokens.map((balance) => balance.toNumber());
    });
}
