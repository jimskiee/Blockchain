require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths:{
    artifacts:'./src/artifacts'
  },
  networks:{
    hardhat:{
      chainId:3337
    },
    ropsten:
    {
      url:"https://ropsten.infura.io/v3/cf6a418aa73343fa9672cb5c2cff61dc",
      //account:[`0x${process.env.ROPSTEN_TEST_ACCOUNT_KEY}`]
      accounts:["0x84506710dcabf14f76ae3d1b0b26e4b291106544228ff8572740bc768a94b054"]
    }
  }

};
