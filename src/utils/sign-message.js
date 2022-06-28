import { providers } from 'ethers';

export default function signMessage(providerConfig, message) {
  const provider = new providers.Web3Provider(providerConfig);
  const signer = provider.getSigner();
  return signer.signMessage(message);
}
