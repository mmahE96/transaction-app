const express = require("express");
const Wallet = require("./wallet");
const config = require("./config")
const bodyParser = require('body-parser');
const Ledger = require("./ledger");
const Transaction = require("./transaction")



const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const shop = new Ledger();


app.post("/createwallet", (req, res) => {
    const owner = req.body.owner;
    const {INITIAL_BALANCE} = config; 
    const newWallet = new Wallet(owner, INITIAL_BALANCE);
    shop.addWallet(newWallet);
    res.send(shop);
 })


app.post("/getuser", (req, res) => { 
   const foundUser =  shop.wallets.find(user => user.owner=req.body.name);
   if(foundUser){
       const {owner, address} = foundUser;

   res.send(`Username: ${owner}
             Address:  ${address}`);
   }else{
       res.send("No user with that name!")
   }   
    
})

app.post("/getpending", (req, res) => {
    const owner = req.body.owner

    
    res.send(shop.getPending(owner))

})

app.post("/sendtokens", (req, res) => {
    
        const {amount, senderAddress, recipientAddress} = req.body;

        if(shop.checkUsers(amount, senderAddress, recipientAddress)){

        shop.sendTokens(amount, senderAddress, recipientAddress);
                        

        const transaction =new Transaction("1", amount, senderAddress, recipientAddress, "new", "pending");
        shop.transactionRequests.push(transaction)

        res.send(shop)
    
    }else{
        res.send("Transaction not possible")
    }

    //using user address you can send tokens to his wallet
    //in ledger is shown only address, and amount not username
    
})

app.post("/getmyrequests", (req, res) => {

    const address = req.body.address;
    const requests = shop.getmyrequests(address);
    if (requests){
        res.send(requests)
        
}else{
    res.send("You have zero requests")
}        

})

app.post("/answer", (req, res) => {

    const {id, answer} = req.body;    
    const request = shop.answer(id, answer)
   res.send(request);    

       

})





app.get("/getbalance", (req, res) => {

    shop.wallets[0].balance = shop.wallets[0].balance + 20;
    const sen = JSON.stringify(shop.wallets[0].balance )

  res.send(sen)
    

})





app.listen(3000, () =>{ 
console.log("Listening to the port 3000")})


module.exports = shop ;