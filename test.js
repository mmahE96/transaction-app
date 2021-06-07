const Ledger = require("./ledger");
const Transaction = require("./transaction")
const Wallet = require("./wallet");
const newAddress = require("./config")

const nL = new Ledger();

const nW = new Wallet("Mahir", "Ruzevik", 500)
const rW = new Wallet("Edo", "Bojnik", 500)

nL.addWallet(nW)
nL.addWallet(rW)


const nT =Transaction.firstTransaction();
nL.addTransaction(nT)

const sT =Transaction.newTransaction(12, nW, "r4", nL);
nL.addTransaction(sT)

const dT =Transaction.newTransaction(12, nW, "rr", nL);
nL.addTransaction(dT)



console.log(newAddress)
