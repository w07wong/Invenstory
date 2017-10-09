// exports and deploys greeter
// DO NOT EDIT THE CODE IN THIS FILE
var Inventory = artifacts.require("./Inventory.sol");

module.exports = function(deployer) {
    deployer.deploy(Inventory);
};
