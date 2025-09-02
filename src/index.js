const express = require('express');
// import express from 'express';
const app = express();

app.use(express.json());

// defining_the_existing_coins
let EthBalance = 10; // Example: 10 ETH
let UsdcBalance = 20000; // Example: 20,000 USDC

app.post("/buy", (req, res) => {
  const quantity = req.body.quantity;
  const updatedEthQuantity = EthBalance - quantity;
  const updatedUsdcBalance = EthBalance * UsdcBalance / updatedEthQuantity;
  const paidAmount = updatedUsdcBalance - UsdcBalance;

  EthBalance = updatedEthQuantity;
  UsdcBalance = updatedUsdcBalance;

  res.json({
    massage: `You have successfully bought ${quantity} ETH by paying ${paidAmount} USDC`,
  });
})

app.post("/sell", (req, res) => {
  const quantity = req.body.quantity;
  const updatedEthQuantity = EthBalance + quantity;
  const updatedUsdcBalance = EthBalance * UsdcBalance / updatedEthQuantity;
  const gotAmount = UsdcBalance - updatedUsdcBalance;


  EthBalance = updatedEthQuantity;
  UsdcBalance = updatedUsdcBalance;

  res.json({
    massage: `You have successfully sell ${quantity} ETH to get ${gotAmount} USDC`,
  });
})

app.get("/", (_, res) => {
  res.json({
    massage: `You have ${EthBalance} ETH and ${UsdcBalance} USDC`,
  });
})

app.listen(8000)

console.log("Server is running on port http://localhost:8000");
