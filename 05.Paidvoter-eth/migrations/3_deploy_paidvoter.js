var Paidvoter = artifacts.require("./Paidvoter.sol");

module.exports = function(deployer) {
  deployer.deploy(Paidvoter);
};
