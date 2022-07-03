### Deploy an ERC20 token in 5 mintues

1. Open [remix](https://remix.ethereum.org/), create a new file such as `newToken.sol`. 
2. Google `openzeppelin erc20`, find this [ERC20 doc](https://docs.openzeppelin.com/contracts/4.x/erc20).
3. There is an ERC20 code sample in **Constructing an ERC20 Token Contract**, copy the code to newToken.sol.
```
// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLDToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Gold", "GLD") {
        _mint(msg.sender, initialSupply);
    }
}
```
4. Change contract name, token name and ticker.
```
// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract newToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("newToken", "NT") {
        _mint(msg.sender, initialSupply);
    }
}
```
5. Compile newToken.sol. 
6. Switch to Deploy tab, change ENVIRONMENT to `Injected Web3`. It will connect your metamask wallet. You can use any EVM chain in your wallet.
7. In Deploy button, you need to define INITIALSUPPLY. By default, this ERC20 token's decimals is 18. So if the initial supply is 10000, you need to set it to 10000 + 18Zeros.
9. Deploy.
