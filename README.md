# UpgradeableSmartContract

## 📌 Overview

This project demonstrates the implementation of an upgradeable smart contract using the EIP-1967 proxy standard. The EIP-1967 standardizes the storage slots for proxy contracts, facilitating seamless upgrades while maintaining consistent storage layouts.

## 🎯 Objective
To deepen understanding of smart contract proxy patterns and their significance in enabling contract upgradability. This includes:

- **Researching the EIP-1967 proxy standard.**
- **Documenting findings comprehensively.**
- **Implementing a simplified version in Solidity.**
- **Deploying and interacting with the contracts using Hardhat.**

## 🧠 Understanding EIP-1967 Proxy Standard
### What is EIP-1967?

EIP-1967 is an Ethereum Improvement Proposal that specifies standard storage slots for proxy contracts. This standardization ensures that the storage layout of proxy contracts does not conflict with that of the implementation contracts, thereby facilitating safe and predictable upgrades.

### Key Features

- **Standardized Storage Slots**: Defines specific storage slots for critical proxy data, such as the implementation address.
- **Upgradeability:**: Allows the logic of a contract to be upgraded without altering its address or disrupting its state.
- **Compatibility**: Enhances compatibility with tools and services that interact with smart contracts by providing predictable storage layouts.

### How It Works
In the EIP-1967 pattern:

1. **Proxy Contract**: Delegates calls to an implementation contract using delegatecall. It holds the state and the address of the implementation contract.

2. **Implementation Contract**: Contains the logic to be executed. It does not hold any state.

3. **Storage Slot**: The implementation address is stored in a specific storage slot defined by EIP-1967 to prevent storage collisions.

## ✅ Advantages:

**Upgradeability**
**Modular and reusable code**
**Compatible with tools like OpenZeppelin**


## 📄 Contracts

### LogicContract.sol
A simple contract that allows setting and retrieving a ```uint256``` value.

### Proxy.sol
A simple proxy contract that holds a delegatecall

## Deployment
### Prerequisites

**Node.js and npm installed**.
**Hardhat installed globally or as a dev dependency**.

### steps

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/James-wasonga/UpgradeableSmartContract.git
   ```

2. Navigate to the project directory:
   ```bash
   cd UpgradeableSmartContract
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Compile contracts:
    ```bash
    npx hardhat compile
    ```
3. Deploy Contracts:
    ```bash
    npx hardhat run scripts/deploy.js
    ```

## Testing:
    ```bash
    npx hardhat test
    ```

