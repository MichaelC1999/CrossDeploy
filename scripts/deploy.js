
// const { ethers } = require("ethers");
const hre = require("hardhat");
const viem = require('viem')



async function main() {

  const GOERLI_DEPLOYER_ADDRESS = "0x495f23966fcB4b5B18722A1DE6EB01A921C25Ee3"
  const MUMBAI_DEPLOYER_ADDRESS = "0x415E89ed57A5ba7cBf6311b41530E156C1659ea4"
  const GOERLI_REGISTRY_ADDRESS = "0x19183E12A703f183F9743cAd1cA28138E2c8dfEe"
  const MUMBAI_REGISTRY_ADDRESS = "0x8a0B6f695F347A73bCfE5EbF8eA698b52e8cD80A"

  const deployer = await hre.ethers.getContractAt("Deployer", GOERLI_DEPLOYER_ADDRESS)
  const registry = await hre.ethers.getContractAt("Registry", GOERLI_REGISTRY_ADDRESS)

  const constructorArgBytes = viem.encodeAbiParameters(
    [
      { name: 'number', type: 'uint' },
      { name: 'test', type: 'string' }
    ],
    [4, "STRINGTEST"]
  )
  const creationBytecode = "0x6080604052600160005534801561001557600080fd5b50604051610297380380610297833981016040819052610034916100f9565b6000829055604051610067906020016020808252600a908201526914d514925391d51154d560b21b604082015260600190565b604051602081830303815290604052805190602001208160405160200161008e91906101b2565b60405160208183030381529060405280519060200120036100b8576100b482600b6101e5565b6000555b505061020c565b634e487b7160e01b600052604160045260246000fd5b60005b838110156100f05781810151838201526020016100d8565b50506000910152565b6000806040838503121561010c57600080fd5b825160208401519092506001600160401b038082111561012b57600080fd5b818501915085601f83011261013f57600080fd5b815181811115610151576101516100bf565b604051601f8201601f19908116603f01168101908382118183101715610179576101796100bf565b8160405282815288602084870101111561019257600080fd5b6101a38360208301602088016100d5565b80955050505050509250929050565b60208152600082518060208401526101d18160408501602087016100d5565b601f01601f19169190910160400192915050565b8082018082111561020657634e487b7160e01b600052601160045260246000fd5b92915050565b607d8061021a6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80638381f58a14602d575b600080fd5b603560005481565b60405190815260200160405180910390f3fea264697066735822122095e301bb3df672fbdfd5422a9827f0ce6ed7d8024399c1bfa997cc596ab3d43964736f6c63430008130033"


  // Deploy deployer and registry *********************************************************

  // const depo = await hre.ethers.deployContract("Deployer", [5], {
  //   value: 0,
  // });

  // const depoContract = (await depo.waitForDeployment());
  // console.log("Deployer Contract: ", depoContract.target, "Registry Contract: ", await depoContract.viewRegistryAddress())

  // ***************************************************************************************


  // ADD CONNECTED DEPLOYER****************************************************************************************

  // const tx = await deployer.addConnectedDeployer(80001, MUMBAI_DEPLOYER_ADDRESS)
  // console.log(await tx.wait(), " Connected deployer added")

  // // // *********************************************************************************************************************************


  // // // ATTEMPT THE BRIDGE *************************************************************************************************************


  const wethAddress = await registry.getWethAddress(5)


  const erc20 = await hre.ethers.getContractAt("IERC20", wethAddress)
  const appTx = await erc20.approve(GOERLI_DEPLOYER_ADDRESS, "20000000000000000")
  // console.log((await appTx.wait()).hash, " Token approve success")
  const depotx = await deployer.deployToChain(80001, "Chaser Test", creationBytecode, constructorArgBytes, { gasLimit: 1000000 })
  console.log("Deposit Call tx hash: ", (await depotx.wait()).hash)

  console.log(await registry.getContractAddressByName("Chaser Test", "0x0000000000000000000000000000000000000000", 80001))

  // Read event log for predicted address and deposit id

  // *********************************************************************************************************************************

  // VIEW TEST_ADDR ON MUMBAI ****************************************************************************************************************************
  //SEPARATE INTO ITS OWN FILE, CHANGING THE DEPLOYER ADDRESS AND HARDHAT NETWORK TO MUMBAI

  // const registry = await hre.ethers.getContractAt("Registry", MUMBAI_REGISTRY_ADDRESS)
  // const testDeployedAddr = (await registry.getContractAddressByName("Chaser Test", "0x0000000000000000000000000000000000000000", 80001))
  // const testContract = await hre.ethers.getContractAt("TestContract", testDeployedAddr)
  // console.log(await testContract.number())

  // ***********************************************************************************************************************************************************

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Goerli Deployer 0x8F90fb3F78a8842D691B01b25d45f7DDA651B255
// 0xd0B04aAdEa66b555dc979A86bB9D4B5E8C67e0F8
// 
// ArbGor Deployer 0x9b1127DC431D2F042721Fb216739b48593c5001f
