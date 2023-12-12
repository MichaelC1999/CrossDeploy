
// const { ethers } = require("ethers");
const hre = require("hardhat");
const viem = require('viem')



async function main() {
  // Deploy deployer and registry *********************************************************

  // const depo = await hre.ethers.deployContract("Deployer", [5], {
  //   value: 0,
  // });

  // const depoContract = (await depo.waitForDeployment());
  // console.log(depoContract.target, await depoContract.viewRegistryAddress())

  // ***************************************************************************************


  // SAME CHAIN DEPLOYMENT FROM CONTRACT TEST ***********************************
  // const creationBytecode = "0x6080604052600160005534801561001557600080fd5b506040516104b83803806104b883398181016040528101906100379190610255565b8160008190555060405160200161004d9061030e565b60405160208183030381529060405280519060200120816040516020016100749190610372565b60405160208183030381529060405280519060200120036100a357600b8261009c91906103c3565b6000819055505b50506103f7565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6100d1816100be565b81146100dc57600080fd5b50565b6000815190506100ee816100c8565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610147826100fe565b810181811067ffffffffffffffff821117156101665761016561010f565b5b80604052505050565b60006101796100aa565b9050610185828261013e565b919050565b600067ffffffffffffffff8211156101a5576101a461010f565b5b6101ae826100fe565b9050602081019050919050565b60005b838110156101d95780820151818401526020810190506101be565b60008484015250505050565b60006101f86101f38461018a565b61016f565b905082815260208101848484011115610214576102136100f9565b5b61021f8482856101bb565b509392505050565b600082601f83011261023c5761023b6100f4565b5b815161024c8482602086016101e5565b91505092915050565b6000806040838503121561026c5761026b6100b4565b5b600061027a858286016100df565b925050602083015167ffffffffffffffff81111561029b5761029a6100b9565b5b6102a785828601610227565b9150509250929050565b600082825260208201905092915050565b7f7a6f6f6700000000000000000000000000000000000000000000000000000000600082015250565b60006102f86004836102b1565b9150610303826102c2565b602082019050919050565b60006020820190508181036000830152610327816102eb565b9050919050565b600081519050919050565b60006103448261032e565b61034e81856102b1565b935061035e8185602086016101bb565b610367816100fe565b840191505092915050565b6000602082019050818103600083015261038c8184610339565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006103ce826100be565b91506103d9836100be565b92508282019050808211156103f1576103f0610394565b5b92915050565b60b3806104056000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80638381f58a14602d575b600080fd5b60336047565b604051603e91906064565b60405180910390f35b60005481565b6000819050919050565b605e81604d565b82525050565b6000602082019050607760008301846057565b9291505056fea2646970667358221220e11958614cc22a33021f75e4544f36ae2fc08e5901648d7a9066eaca043e5efe64736f6c63430008130033"

  // const deployFromWithin = await depoContract.deployToChain(1, creationBytecode, encodedBytes)
  // await deployFromWithin.wait()

  // const testContAddr = await depoContract.TEST_INSTANCE_ADDRESS()
  // const testCont = await hre.ethers.getContractAt("TestContract", testContAddr)

  // console.log(await testCont.number(), testContAddr)
  // *********************************************************************

  // ADD CONNECTED DEPLOYER****************************************************************************************
  // const deployAddress = "0xb2cE732FF09197a52A967a90926e2476b0616299"
  // const deployer = await hre.ethers.getContractAt("Deployer", deployAddress)
  // const tx = await deployer.addConnectedDeployer(80001, "0x1c943207bF4Ae4098Fb21cc95Dae17C33Ae347b7")
  // console.log(await tx.wait())
  // addConnectedDeployer(
  // chainId
  // deployerConnection
  // *********************************************************************************************************************************


  // ATTEMPT THE BRIDGE *************************************************************************************************************
  // const encodedBytes = viem.encodeAbiParameters(
  //   [
  //     { name: 'number', type: 'uint' },
  //     { name: 'test', type: 'string' }
  //   ],
  //   [4, "STRINGTEST"]
  // )
  // const creationBytecode = "0x6080604052600160005534801561001557600080fd5b506040516104b83803806104b883398181016040528101906100379190610255565b8160008190555060405160200161004d9061030e565b60405160208183030381529060405280519060200120816040516020016100749190610372565b60405160208183030381529060405280519060200120036100a357600b8261009c91906103c3565b6000819055505b50506103f7565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6100d1816100be565b81146100dc57600080fd5b50565b6000815190506100ee816100c8565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610147826100fe565b810181811067ffffffffffffffff821117156101665761016561010f565b5b80604052505050565b60006101796100aa565b9050610185828261013e565b919050565b600067ffffffffffffffff8211156101a5576101a461010f565b5b6101ae826100fe565b9050602081019050919050565b60005b838110156101d95780820151818401526020810190506101be565b60008484015250505050565b60006101f86101f38461018a565b61016f565b905082815260208101848484011115610214576102136100f9565b5b61021f8482856101bb565b509392505050565b600082601f83011261023c5761023b6100f4565b5b815161024c8482602086016101e5565b91505092915050565b6000806040838503121561026c5761026b6100b4565b5b600061027a858286016100df565b925050602083015167ffffffffffffffff81111561029b5761029a6100b9565b5b6102a785828601610227565b9150509250929050565b600082825260208201905092915050565b7f7a6f6f6700000000000000000000000000000000000000000000000000000000600082015250565b60006102f86004836102b1565b9150610303826102c2565b602082019050919050565b60006020820190508181036000830152610327816102eb565b9050919050565b600081519050919050565b60006103448261032e565b61034e81856102b1565b935061035e8185602086016101bb565b610367816100fe565b840191505092915050565b6000602082019050818103600083015261038c8184610339565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006103ce826100be565b91506103d9836100be565b92508282019050808211156103f1576103f0610394565b5b92915050565b60b3806104056000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80638381f58a14602d575b600080fd5b60336047565b604051603e91906064565b60405180910390f35b60005481565b6000819050919050565b605e81604d565b82525050565b6000602082019050607760008301846057565b9291505056fea2646970667358221220e11958614cc22a33021f75e4544f36ae2fc08e5901648d7a9066eaca043e5efe64736f6c63430008130033"


  // // // //Get wethAddress from deployer
  // const registry = await hre.ethers.getContractAt("Registry", "0xE5c7878B79B454EBa613de8C83e9CDA69e618f28")
  // const wethAddress = await registry.getWethAddress(5)
  // // // // //Get spokepool address
  // const spoke = await registry.chainIdToSpokePoolAddress(5)
  // // // // // instantiatet erc20 
  // const erc20 = await hre.ethers.getContractAt("IERC20", wethAddress)

  // const appTx = await erc20.approve(deployAddress, "10000000000000000")
  // console.log(appTx.hash, await appTx.wait())
  // // // // call approval for spokepool
  // const depotx = await deployer.deployToChain(80001, creationBytecode, encodedBytes, { gasLimit: 1000000 })
  // console.log(depotx)
  // console.log(await depotx.wait())
  // *********************************************************************************************************************************

  // VIEW TEST_ADDR ON MUMBAI ****************************************************************************************************************************

  // const deployer = await hre.ethers.getContractAt("Deployer", "0x1c943207bF4Ae4098Fb21cc95Dae17C33Ae347b7")
  // console.log(await deployer.TEST_INSTANCE_ADDRESS())


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
// ArbGor Deployer 0x9b1127DC431D2F042721Fb216739b48593c5001f
