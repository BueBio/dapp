import { Contract, providers } from 'ethers';
import erc721 from './abi.json';

export default function checkIfHaveNft(userAddress, nftAddress, provider) {
  const providerContract = new providers.Web3Provider(provider);
  const contract = new Contract(nftAddress, erc721, providerContract);
  return contract.balanceOf(userAddress)
    .then((balance) => {
      return balance.toNumber() > 0;
    })
    .catch((err) => {
      console.log('Error: ', err);
      return false;
    });
}
