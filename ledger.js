const Transaction = require("./transaction");
const shop = require ("./server")

class Ledger {
    constructor(){
        this.wallets=[];
        this.transactions=[];              
    }

    toString(){
        return `Ledger:
        Wallets:        ${this.wallets}
        Transactions:   ${this.transactions}
        `
    }

    static getPendingTransacions(){
        return this.pendingTransactions;
    }

    addWallet(wallet){
        this.wallets.push(wallet);
        console.log(`New wallet added ${wallet}`)
    }

    sendTokens(amount, senderAddress, recipientAddress){
        let tokens = Number(amount);

        this.wallets.forEach(wallet => {
            if(wallet.address===recipientAddress){
                wallet.balance = Number(wallet.balance) + tokens;                

            }else{
                console.log("No such address recipient")
            }
            return;
        })

        this.wallets.forEach(wallete => {
            if(wallete.address===senderAddress){
                wallete.balance = Number(wallete.balance) - tokens;
                
            }else{
                console.log("No such addrress sender")
            }
            return;
        })

    }    
}

module.exports = Ledger;