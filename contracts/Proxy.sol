// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Proxy {
    bytes32 private constant IMPLEMENTATION_SLOT = bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1);
    address private admin;

    constructor(address _implementation) {
        admin = msg.sender;
        _setImplementation(_implementation);
    }

    function _setImplementation(address _impl) internal {
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            sstore(slot, _impl)
        }
    }

    function upgradeTo(address _newImplementation) external {
        require(msg.sender == admin, "Only admin can upgrade");
        _setImplementation(_newImplementation);
    }

    fallback() external payable {
        _delegate(_getImplementation());
    }

    receive() external payable {
        _delegate(_getImplementation());
    }

    function _getImplementation() internal view returns (address impl) {
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            impl := sload(slot)
        }
    }

    function _delegate(address impl) internal {
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}
