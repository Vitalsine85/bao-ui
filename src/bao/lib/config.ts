import { Config } from './types'

export default {
  networkId: 3,
  defaultRpc: {
    chainId: '0x3',
    rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://ropsten.etherscan.io'],
    chainName: 'Ropsten Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  addressMap: {
    uniswapFactory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    uniswapFactoryV2: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    lendingLogicKashi: '0xcBA495A74e23D5B42853e41334e26DDd322Af082',
    DAI: '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108',
    baoUSD: '0x7945b0A6674b175695e5d1D08aE1e6F13744Abb0',
    WETH: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    DEAD: '0x000000000000000000000000000000000000dead',
    // NFTs
    baoElder: '0x39c1f6e78c5200674c84c46dc5bf85ba9f6f630a',
    baoSwap: '0x36e58282a053f888881cdaa4ba4f44dc7af15024',
  },
  contracts: {
    bao: {
      3: {
        address: '0x4C392822D4bE8494B798cEA17B43d48B2308109C',
        abi: 'bao.json',
      },
    },
    masterChef: {
      3: {
        address: '0x850161bF73944a8359Bd995976a34Bb9fe30d398',
        abi: 'masterchef.json',
      },
    },
    weth: {
      3: {
        address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
        abi: 'weth.json',
      },
    },
    // Soft Synths
    recipe: {
      3: {
        address: '0x0C9DF041582741b9Ae384F31209A6Dc7ea6B9Bcb',
        abi: 'recipe.json',
      },
    },
    wethPrice: {
      3: {
        address: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
        abi: 'chainoracle.json',
      },
    },
    basketRedeem: {
      3: {
        address: '0x174c726ED2E30560935247C410294DB5FfEa39D4',
        abi: 'nestRedeem.json',
      },
    },
    // Hard Synths
    comptroller: {
      3: {
        address: '0x831E1605dd6A085E3b47f6F094dF2fa3806D7143',
        abi: 'comptroller.json',
      },
    },
    marketOracle: {
      3: {
        address: '0xEbdC2D2a203c17895Be0daCdf539eeFC710eaFd8',
        abi: 'marketOracle.json',
      },
    },
    stabilizer: {
      3: {
        address: '0x598D87CA75a9C764A8d1006018ff3c1b72EC816E',
        abi: 'stabilizer.json',
      },
    },
    nft: {
      3: {
        address: '0x6172f3e66B26F9F962b456ce54b2D85Cce37a9d4',
        abi: 'nft.json',
      },
    },
    nft2: {
      3: {
        address: '0x06Cc05eAf491367729438DF1Ff46B914Daa329A1',
        abi: 'nft.json',
      },
    },
  },
  subgraphs: {
    sushiExchange: {
      3: 'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange',
      1: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
    },
    pollyBurn: {
      137: 'https://api.thegraph.com/subgraphs/name/clabby/bao-burn',
    },
    baoMarkets: {
      3: 'https://api.thegraph.com/subgraphs/name/clabby/bao-markets-ropsten-subgraph',
    },
  },
  markets: [
    {
      mid: 1,
      symbol: 'baoUSD',
      marketAddresses: {
        3: '0xfD4cDC5129Dd794E26FD3764C8f2075EE13B9A53',
      },
      underlyingAddresses: {
        3: '0x4aB319aE3EF47479C229fE742463B9b2Cf1c7647',
      },
      isSynth: true,
      icon: '/baoUSD.png',
      coingeckoId: 'dai',
      underlyingDecimals: 18,
    },
    {
      mid: 2,
      symbol: 'bETH',
      marketAddresses: {
        3: '0xd4E71A9D982b74110Cc3307d7D296927B3afBBDc',
      },
      underlyingAddresses: {
        3: 'ETH',
      },
      icon: '/WETH.png',
      coingeckoId: 'weth',
      underlyingDecimals: 18,
    },
    {
      mid: 3,
      symbol: 'bUSDC',
      marketAddresses: {
        3: '0xCaAd85c5a9f31c679742ea6f8654c3B53b4c6d7D',
      },
      underlyingAddresses: {
        3: '0x48C1be647204eb97BC5C6914e5D60E7A7b7b398B',
      },
      icon: '/USDC.png',
      coingeckoId: 'usd-coin',
      underlyingDecimals: 6,
    },
  ],
  baskets: [],
  farms: [],
} as Config
