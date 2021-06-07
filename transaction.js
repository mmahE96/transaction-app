const Ledger = require("./ledger");

class Transaction {
    constructor(id, amount, senderAddress, recipientAddress, state ){
        
        this.id=id;
        this.amount=amount;
        this.senderAddress=senderAddress;
        this.recipientAddress=recipientAddress;
        this.state=state;
    }
    

    toString() {
        return `Transaction:
        id:                 ${this.id}
        amount:             ${this.amount}
        senderAddress:      ${this.senderAddress}
        recipientAddress:   ${this.recipientAddress}
        state:              ${this.state} 
        `
    }

    static firstTransaction(){
        return new this(0, 0, 0, 0, "first" )
    }

    static newTransaction(amount, senderWallet, recipientAddress, ledger) {


        if(senderWallet.balance < amount){
            console.log("You do not have enough tokens to send!")
            return;
        } else {
            
        
        const id = ledger.transactions[ledger.transactions.length - 1].id + 1;

        return new this(id, amount, senderWallet.address, recipientAddress, "new")
    }

    }
    
}

module.exports = Transaction;