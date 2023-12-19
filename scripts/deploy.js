
// const { ethers } = require("ethers");
const hre = require("hardhat");
const viem = require('viem')



async function main() {

  const network = "mumbai"

  const GOERLI_DEPLOYER_ADDRESS = "0xed5d14634d68F8cb139Ef13FE25Fe1C4483BBf77"
  const GOERLI_REGISTRY_ADDRESS = "0x12dA5438c26D4264C4e6Ded6Ff63673f84F42dfE"
  const MUMBAI_DEPLOYER_ADDRESS = "0xE16400324a93dE4c7217469A600F0694BA01d011"
  const MUMBAI_REGISTRY_ADDRESS = "0x5C19DBCf4C3515fc091eE6D54B3db92A03c43201"




  const constructorArgBytes = viem.encodeAbiParameters(
    [
      { name: 'number', type: 'uint' },
      { name: 'test', type: 'string' }
    ],
    [4, "STRINGTEST"]
  )
  const creationBytecode = "0x6080604052600160005534801561001557600080fd5b50604051610297380380610297833981016040819052610034916100f9565b6000829055604051610067906020016020808252600a908201526914d514925391d51154d560b21b604082015260600190565b604051602081830303815290604052805190602001208160405160200161008e91906101b2565b60405160208183030381529060405280519060200120036100b8576100b482600b6101e5565b6000555b505061020c565b634e487b7160e01b600052604160045260246000fd5b60005b838110156100f05781810151838201526020016100d8565b50506000910152565b6000806040838503121561010c57600080fd5b825160208401519092506001600160401b038082111561012b57600080fd5b818501915085601f83011261013f57600080fd5b815181811115610151576101516100bf565b604051601f8201601f19908116603f01168101908382118183101715610179576101796100bf565b8160405282815288602084870101111561019257600080fd5b6101a38360208301602088016100d5565b80955050505050509250929050565b60208152600082518060208401526101d18160408501602087016100d5565b601f01601f19169190910160400192915050565b8082018082111561020657634e487b7160e01b600052601160045260246000fd5b92915050565b607d8061021a6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80638381f58a14602d575b600080fd5b603560005481565b60405190815260200160405180910390f3fea264697066735822122095e301bb3df672fbdfd5422a9827f0ce6ed7d8024399c1bfa997cc596ab3d43964736f6c63430008130033"

  let newAddr = {}

  // Deploy deployer and registry *********************************************************


  // const depo = await hre.ethers.deployContract("Deployer", [5], {
  //   value: 0,
  // });

  // const depoContract = (await depo.waitForDeployment());
  // newAddr.depo = depoContract.target
  // newAddr.reg = await depoContract.viewRegistryAddress()
  // console.log("Deployer Contract: ", newAddr.depo, "Registry Contract: ", newAddr.reg)

  // // // *********************************************************************************************************************************


  const GOERLI_DEPLOYER_CONTRACT = await hre.ethers.getContractAt("Deployer", (GOERLI_DEPLOYER_ADDRESS))
  const GOERLI_REGISTRY_CONTRACT = await hre.ethers.getContractAt("Registry", (GOERLI_REGISTRY_ADDRESS))
  const MUMBAI_DEPLOYER_CONTRACT = await hre.ethers.getContractAt("Deployer", (MUMBAI_DEPLOYER_ADDRESS))
  const MUMBAI_REGISTRY_CONTRACT = await hre.ethers.getContractAt("Registry", (MUMBAI_REGISTRY_ADDRESS))



  // ADD CONNECTED DEPLOYER****************************************************************************************
  //Add these to both Goerli and Mumbai for testing

  // const GoerliTx1 = await GOERLI_DEPLOYER_CONTRACT.addConnectedDeployer(5, GOERLI_DEPLOYER_ADDRESS)
  // console.log((await GoerliTx1.wait()).hash, " ConnectedDeployer added 1")
  // const GoerliTx2 = await GOERLI_DEPLOYER_CONTRACT.addConnectedDeployer(80001, MUMBAI_DEPLOYER_ADDRESS)
  // console.log((await GoerliTx2.wait()).hash, " ConnectedDeployer added 2")

  // const MumbaiTx1 = await MUMBAI_DEPLOYER_CONTRACT.addConnectedDeployer(5, GOERLI_DEPLOYER_ADDRESS)
  // console.log((await MumbaiTx1.wait()).hash, " ConnectedDeployer added 1")
  // const MumbaiTx2 = await MUMBAI_DEPLOYER_CONTRACT.addConnectedDeployer(80001, MUMBAI_DEPLOYER_ADDRESS)
  // console.log((await MumbaiTx2.wait()).hash, " ConnectedDeployer added 2")



  // // // *********************************************************************************************************************************


  // // // ATTEMPT THE BRIDGE *************************************************************************************************************


  // const wethAddress = await GOERLI_REGISTRY_CONTRACT.getWethAddress(5)
  // const erc20 = await hre.ethers.getContractAt("IERC20", wethAddress)
  // const appTx = await erc20.approve(GOERLI_DEPLOYER_ADDRESS, "200000000000000")
  // console.log((await appTx.wait()).hash, " Token approve success")
  // const depotx = await GOERLI_DEPLOYER_CONTRACT.deployToChain(80001, "Chaser Test", creationBytecode, constructorArgBytes, { gasLimit: 1000000 })
  // console.log("Deposit Call tx hash: ", (await depotx.wait()).hash)

  // const predictedAddressOrigin = await GOERLI_REGISTRY_CONTRACT.getContractAddressByName("Chaser Test", "0x0000000000000000000000000000000000000000", 80001)

  // console.log("Predicted Contract Address from origin: ", predictedAddressOrigin)


  // *********************************************************************************************************************************



  //MUMBAI NON-BRIDGE Deployment ************************************************************************************************
  //Construct the message and call the handleAcrssMessage on mumbai with no bridge


  // const messageRes = await MUMBAI_DEPLOYER_CONTRACT.createDeployMessage(
  //   creationBytecode,
  //   constructorArgBytes,
  //   "Chaser Test",
  //   80001
  // );

  // console.log(messageRes)

  // // const extract = await MUMBAI_DEPLOYER_ADDRESS.extractMessageComponents(messageRes[0])

  // // const computation = await MUMBAI_DEPLOYER_CONTRACT.computeDestinationAddress(
  // //   messageRes[1],
  // //   messageRes[0],
  // //   80001
  // // )
  // // console.log(computation)
  // const handleTx = await MUMBAI_DEPLOYER_CONTRACT.handleAcrossMessage(
  //   "0x0000000000000000000000000000000000000000",
  //   0,
  //   true,
  //   "0x0000000000000000000000000000000000000000",
  //   messageRes[0]
  // )

  // console.log((await handleTx.wait()).hash)

  const testDeployedAddr = (await MUMBAI_REGISTRY_CONTRACT.getContractAddressByName("Chaser Test", "0x0000000000000000000000000000000000000000", 80001))

  console.log(testDeployedAddr)

  const testContract = await hre.ethers.getContractAt("TestContract", testDeployedAddr)
  console.log(await testContract.number())

  //************************************************************************************************************************************************

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
