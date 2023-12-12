require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  defaultNetwork: "mumbai",
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_API_KEY,
      chainId: 5,
      accounts: [process.env.WALLET_PK]
    },
    arbGoerli: {
      url: "https://arbitrum-goerli.infura.io/v3/" + process.env.INFURA_API_KEY,
      chainId: 421613,
      accounts: [process.env.WALLET_PK]
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/" + process.env.INFURA_API_KEY,
      chainId: 80001,
      accounts: [process.env.WALLET_PK]
    },
  }
};
