// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract VibeGuardEscrow {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    address public aiAgent; // The wallet address of your Node.js backend

    constructor(address _aiAgent) {
        aiAgent = _aiAgent; // Set your Agent's public address here on deploy
    }

    function releaseFunds(uint256 amount, bytes memory signature) public {
        // 1. Recreate the hash that the backend signed
        bytes32 messageHash = keccak256(abi.encodePacked(amount));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();

        // 2. Recover the signer from the signature
        address signer = ethSignedMessageHash.recover(signature);

        // 3. Verify the signer is the authorized AI Agent
        require(signer == aiAgent, "Invalid AI Signature: Not Authorized");

        // 4. Send the funds (BNB) to the caller (the worker)
        payable(msg.sender).transfer(amount);
    }

    // Allow the contract to receive BNB
    receive() external payable {}
}