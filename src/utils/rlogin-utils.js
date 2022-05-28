export default function getNetworkName(networkId) {
  switch (networkId) {
    case 30:
      return 'RSK Mainnet';
    case 31:
      return 'RSK Testnet';
    default:
      return '';
  }
}
