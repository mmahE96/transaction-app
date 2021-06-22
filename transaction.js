const Ledger = require("./ledger");

//function countDown(){
     //napraviti funkciju koja ce odbrojavati 2h unazad, kada odbroji, promjeniti state u expired
//}

class Transaction {
    constructor(id,
        amount,
        senderAddress,
        recipientAddress,
        state="new",
        approved,
        adminApproval=false,
        expire=Date.now())

        {        
        this.id=id;
        this.amount=amount;
        this.senderAddress=senderAddress;
        this.recipientAddress=recipientAddress;
        this.state=state;
        this.approved=approved;
        this.adminApproval= adminApproval;
        this.expire=expire;
    }
    

    toString() {
        return `Transaction Request:
        id:                 ${this.id}
        amount:             ${this.amount}
        senderAddress:      ${this.senderAddress}
        recipientAddress:   ${this.recipientAddress}
        state:              ${this.state} 
        approved:           ${this.approved}
        adminApproval:      ${this.adminApproval}
        expire:             ${this.expire}
        `
    }

    // expire treba da prikazuje koliko vremena je ostalo do isteka 
    // transakcije i onda postaje false(approval) ako se ne odobri od admina i usera

    //adminApproval daje samo admin

    // approved postaje true kada korisnik za be prihvati svoju transakciju

    //state postaje approved ako je approved i adminApproval ture

    

    static firstTransaction(){
        return new this(0, 0, 0, 0, "first" )
    }

    static newTransaction(amount, senderWallet, recipientAddress, ledger) {


        if(senderWallet.balance < amount){
            console.log("You do not have enough tokens to send!")
            return;
        } else {
            
        
        const id = ledger.transactionRequests[ledger.transactionRequests.length - 1].id + 1;

        return new this(id, amount, senderWallet.address, recipientAddress, "new", "pending")
    }

    }
    
}

module.exports = Transaction;