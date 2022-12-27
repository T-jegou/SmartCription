/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title SmartCription
 * SmartCription - a contract for my non-fungible prescriptions
 * 
 * Prescriptions are minted by a medic to a patient with an initial amount of 2.
 * To claim the prescription, the patient must transfer 1 token to a pharmacist.
 * The remaining token allows the patient to continue to access the prescription metadata.
 * Only the medic can renew the prescription, which increases the amount of tokens by 1.
 * Pharmacists have unlimited tokens of each prescription, but canno't transfer them, only burn them.
 */
contract SmartCription is 
    ERC1155,
    AccessControl,
    ERC1155Burnable,
    ERC1155Pausable,
    ERC1155Supply
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MEDIC_ROLE = keccak256("MEDIC_ROLE");
    bytes32 public constant PHARMACIST_ROLE = keccak256("PHARMACIST_ROLE");

    event PrescriptionClaimed(address indexed account, uint256 indexed id, uint256 block);

    constructor() ERC1155("https://smartcription.io/api/token/{id}") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyRole(MEDIC_ROLE) {
        // token total supply can't exceed 2
        require(totalSupply(id) + amount <= 2, "Total supply can't exceed 2");
        _mint(account, id, amount, data);
    }

    /// @notice Called by the patient to claim the prescription from the pharmacist
    function claim(address account, uint256 id, uint256 amount) public {
        // the recipient must be a pharmacist
        require(hasRole(PHARMACIST_ROLE, account), "The recipient must be a pharmacist");
        // the patient must transfer 1 token to a pharmacist
        require(amount == 1, "The patient must transfer 1 token to a pharmacist");
        // the patient must have 2 tokens
        require(balanceOf(msg.sender, id) == 2, "The patient must have 2 tokens");
        // transfer 1 token to a pharmacist
        safeTransferFrom(msg.sender, account, id, 1, "");
        emit PrescriptionClaimed(msg.sender, id, block.number);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function setURI(string memory newuri) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setURI(newuri);
    }

    function burn(address account, uint256 id, uint256 amount) public override onlyRole(PHARMACIST_ROLE) {
        super.burn(account, id, amount);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal virtual override(ERC1155, ERC1155Pausable, ERC1155Supply) {
        if (hasRole(PHARMACIST_ROLE, operator))
            revert("Pharmacists can't transfer tokens");
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControl, ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}