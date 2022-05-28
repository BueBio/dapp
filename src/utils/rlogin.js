import RLogin from '@rsksmart/rlogin';

const rpcUrls = {
  30: 'https://public-node.rsk.co',
  31: 'https://public-node.testnet.rsk.co',
};

const supportedChains = Object.keys(rpcUrls).map(Number);

const rlogin = new RLogin({
  rpcUrls,
  supportedChains,
  supportedLanguages: ['en', 'es'],
});

export default rlogin;
