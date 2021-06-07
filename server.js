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

app.post("/sendtokens", (req, res) => {

    
        const {amount, senderAddress, recipientAddress} = req.body;

        shop.sendTokens(amount, senderAddress, recipientAddress);

        console.log(shop.wallets);                  

        const transaction =new Transaction("1", amount, senderAddress, recipientAddress, "new");
        shop.transactions.push(transaction)

        res.send(shop)

    //using user address you can send tokens to his wallet
    //in ledger is shown only address, and amount not username
    
})



app.get("/getbalance", (req, res) => {

    shop.wallets[0].balance = shop.wallets[0].balance + 20;

    const sen = JSON.stringify(shop.wallets[0].balance )

  res.send(sen)
    

})





app.listen(3000, () =>{ 
console.log("Listening to the port 3000")})


module.exports = shop ;