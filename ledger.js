const { request } = require("express");
const Transaction = require("./transaction");


class Ledger {
    constructor(){
        this.wallets=[];
        this.transactionRequests=[];              
    }

    toString(){
        return `Ledger:
        Wallets:        ${this.wallets}
        Transactions requests:   ${this.transactionRequests}
        `
    }

    static getPendingTransacions(){
        return this.pendingTransactions;
    }

    addWallet(wallet){
        this.wallets.push(wallet);
        console.log(`New wallet added ${wallet}`)
    }
    

    checkUsers(amount, senderAddress, recipientAddress){
        let tokens = Number(amount);

        const found = this.wallets.find(element => element.address==senderAddress);
        const founds= this.wallets.find(element => element.address==recipientAddress);
        
        if (found && founds){
            if(found.balance>= tokens){
                return true; 
            }else{
                return false;    
            }       
        }else{
            return false;
        }

        }

    sendTokens(amount, senderAddress, recipientAddress){
        let tokens = Number(amount);


        this.wallets.forEach(wallete => {
            if(wallete.address===senderAddress){                
                wallete.balance = Number(wallete.balance) - tokens;              
            }
        })
        
        this.wallets.forEach(wallet => {
            if(wallet.address===recipientAddress){
                wallet.balance = Number(wallet.balance) + tokens; 
                             

            }
        }) 
        
    }   

    getmyrequests(address){

        const requests = this.transactionRequests.filter(element => element.recipientAddress==address)
        return requests;
    }

    answer(id, answer){
        this.transactionRequests.forEach(element => {
            if(element.id==id){
                element.approved = answer;
                element.state = "processed";
            }    
        
        })

       const all = this.transactionRequests.filter(element => element.approved==true);
       return all;
        
        
        
    }
    
    getPending(address){
        const pTransactions = this.transactionRequests.filter(element => element.address==address)
        return pTransactions;
    }

}

module.exports = Ledger;