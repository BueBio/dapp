import {
  Contract,
  providers,
  utils,
} from 'ethers';
import buebioImpact from './buebio-impact-abi.json';

const BUEBIO_IMPACT_ADDRESS = process.env.REACT_APP_CONTRACT_BUEBIO_IMPACT_ADDRESS;

export function getBalanceWalletByToken(walletAddress, tokenId, provider) {
  const providerContract = new providers.Web3Provider(provider);
  const contract = new Contract(BUEBIO_IMPACT_ADDRESS, buebioImpact, providerContract);
  return contract.balanceOf(walletAddress, tokenId)
    .then((balance) => {
      return utils.formatEther(balance);
    });
}

export function getBalanceWalletTokens(wallets, tokens, provider) {
  const providerContract = new providers.Web3Provider(provider);
  const contract = new Contract(BUEBIO_IMPACT_ADDRESS, buebioImpact, providerContract);
  return contract.balanceOfBatch(wallets, tokens)
    .then((balanceTokens) => {
      return balanceTokens.map((balance) => balance.toNumber());
    });
}

export function getDataToken(tokenId, provider) {
  const providerContract = new providers.Web3Provider(provider);
  const contract = new Contract(BUEBIO_IMPACT_ADDRESS, buebioImpact, providerContract);
  return contract.uri(tokenId)
    .then((uri) => {
      return uri;
    });
}
