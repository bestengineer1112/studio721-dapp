import { ChainId, CHAIN_ID, getChainName } from '@openpalette/contract';
import Config from './config';

export function getEtherActorBaseURL(chainId: any) {
  const prefix =
    chainId !== CHAIN_ID.MAINNET ? `${chainId === "0x38" ? 'bsc' : chainId === "0x61" ? 'bsc-testnet' : getChainName(chainId)}.` : '';

  return `https://${prefix}ether.actor`;
}


export function getABIBaseURL(chainId: any, address: string) {
  // const prefix =
  //   chainId !== CHAIN_ID.MAINNET ? `${getChainName(chainId)}.` : '';
  let url;
  if ('0x13881' === chainId) {
    url = `https://api-mumbai.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=${Config.API_KEY["polygon"]}`;
  } else if ('0x89' === chainId) {
    url = `https://api."polygon"scan.com/api?module=contract&action=getabi&address=${address}&apikey=${Config.API_KEY["polygon"]}`;
  } else if ('0x1' === chainId) {
    url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${Config.API_KEY["etherscan"]}`;
  } else if ('0x4' === chainId) {
    url = `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${Config.API_KEY["etherscan"]}`;
  } else if ('0x3' === chainId) {
    url = `https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${Config.API_KEY["etherscan"]}`;
  } else if ('0x38' === chainId) {
    url = `https://api.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=${Config.API_KEY["binance"]}`;
  } else if ('0x61' === chainId) {
    url = `https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=${Config.API_KEY["binance"]}`;
  } else if ('0x10' === chainId) {
    url = `https://api-optimistic.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${Config.API_KEY["etherscan"]}`;
  } else if ('0x45' === chainId) {
    url = `https://api-kovan-optimistic.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${Config.API_KEY["etherscan"]}`;
  } else if ('0x5' === chainId) {
    url = `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${Config.API_KEY["etherscan"]}`;
  }
  console.log(url, "url");
  return url;
}

