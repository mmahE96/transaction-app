const INITIAL_BALANCE = require ("./config")
const {v1:uuidv1} = require("uuid");


class Wallet {
    constructor(owner,balance){
        this.owner=owner;
        this.address=uuidv1();
        this.balance=balance;

    }

    static address(){
        return uuidv1();
    }

    toString(){
        return `Wallet:
        Owner:      ${this.owner}
        Address:    ${this.address}
        Balance:    ${this.balance}`
    }

    static newWallet(owner, INITIAL_BALANCE) {
        return new this(owner, INITIAL_BALANCE);
    }
}

module.exports = Wallet;