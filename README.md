# CrossDeploy

CrossDeploy is a smart contract protocol built on top of the Across Bridge that streamlines management of cross-network protocols. Some of the basic functionality includes:

- Lets developers deploy a contract onto any Across supported network while only requiring gas on one single chain
- Automatically creates a registry of addresses for the protocol among all networks
- Leverages Across messaging to simplify function calls to different networks.
- Enables control systems to manage deployments on all chains from one central contract

The functionality is simple, it uses Across Composable Bridging under the hood to send bytecode to the destination chain and deploy the code as a contract. The Deployer.sol contract gets deployed to various networks, providing for both sending out code to deploy on other networks and receiving this code to deploy on the current network. The registry contract on each chain stores the addresses from deployments on other chains and generates function call message data for creating simplified Across deposit calls. 

As of 11/12, the cross chain contract deployment is working from Goerli (cid 5) to Polygon Mumbai (cid 80001). Here are some addresses

Goerli Deployer Address: 0xb2cE732FF09197a52A967a90926e2476b0616299

Goerli Registry Address: 0xE5c7878B79B454EBa613de8C83e9CDA69e618f28

Mumbai Deployer Address: 0x1c943207bF4Ae4098Fb21cc95Dae17C33Ae347b7

Mumbai test contract deployed from Across Message: 0x3A3Ed63696242bCA74F99D179464675F9D546609