import {
  BigNumber,
  Contract,
  providers,
  utils,
} from 'ethers';
import erc20 from './erc20-abi.json';

export function transfer(toAddress, tokenAddress, provider, quantity, decimals) {
  const providerContract = new providers.Web3Provider(provider);
  const signer = providerContract.getSigner();
  const contract = new Contract(tokenAddress, erc20, signer);
  const bigNumber = BigNumber.from(quantity).mul(10).pow(decimals);
  return contract.transfer(toAddress, bigNumber.toHexString())
    .then((transaction) => {
      return transaction.hash;
    });
}

export function getBalanceWallet(walletAddress, coinAddress, provider) {
  const providerContract = new providers.Web3Provider(provider);
  const contract = new Contract(coinAddress, erc20, providerContract);
  return contract.balanceOf(walletAddress)
    .then((balance) => {
      return utils.formatEther(balance);
    });
}

export function getInfoToken(coinAddress, provider) {
  const providerContract = new providers.Web3Provider(provider);
  const contract = new Contract(coinAddress, erc20, providerContract);
  return Promise.all([
    contract.symbol(),
    contract.name(),
    contract.decimals(),
  ])
    .then((data) => {
      return {
        symbol: data[0],
        name: data[1],
        decimals: data[2],
      };
    });
}
