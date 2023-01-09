pragma solidity ^0.8.3;

import "./openzeppelin/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 { //il nostro contratto eredita dal contratto ERC20 di openzeppelin
    //definiamo un nome, un simbolo e una fornitura iniziale per il tokene e passiamo questi parametri al costruttore ereditato dalla classe ERC20
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply); //assegna l'importo del token al creatore del contratto
    }
}