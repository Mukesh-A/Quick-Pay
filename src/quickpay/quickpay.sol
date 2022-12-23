//SPDX-License-Identifier:Unlicensed

pragma solidity >=0.7.0;

contract quickpay{
    //event will keep record of all of the transaction
    //index will allow u to filter all the transaction
    event transactions(address indexed from, address to, uint amount, string symbol);
   
    event recipients(address indexed recipientOf, address recipient, string recipientName);

   //this will work only for native chain like eth,matic not for any other erc20, so creating saveTx()
    function _transfer(address payable _to, string memory symbol)public payable{

        _to.transfer(msg.value);
        emit transactions(msg.sender, _to, msg.value, symbol);
    }

    //used for transfer of ERC20 tokens
    function saveTx(address from, address to, uint amount,string memory symbol)public{
        //there is no logic written for transfer erc20 here .we are just emiting the transaction
        //tranfer logic will be written in front end using Ether js.

        emit transactions(from,to,amount,symbol); 
    }

    function addRecipient(address recipient,string memory name)public{
        emit recipients(msg.sender,recipient,name);
    }
}

