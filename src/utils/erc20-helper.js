import {
  BigNumber,
  Contract,
  providers,
  utils,
} from 'ethers';
import erc20Abi from './erc20-abi.json';

const BUEBIO_FUTURE_ADDRESS = process.env.REACT_APP_CONTRACT_BUEBIO_FUTURE_ADDRESS;

export function approve(tokenAddress, amount, decimals, provider) {
  const providerContract = new providers.Web3Provider(provider);
  const signer = providerContract.getSigner();
  const contract = new Contract(tokenAddress, erc20Abi, signer);
  const bigNumber = BigNumber.from(`${amount * (10 ** decimals)}`);
  return contract.approve(BUEBIO_FUTURE_ADDRESS, bigNumber.toHexString());
}

export function allowance(walletAddress, tokenAddress, provider) {
  const providerContract = new providers.Web3Provider(provider);
  const contract = new Contract(tokenAddress, erc20Abi, providerContract);
  return contract.allowance(walletAddress, BUEBIO_FUTURE_ADDRESS)
    .then((balance) => {
      return utils.formatEther(balance);
    });
}
