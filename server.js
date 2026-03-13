const express = require("express")

const app = express()

app.use(express.json())

// payment status variable
let paymentStatus = "WAIT"


// Home route

app.get("/", (req,res)=>{

res.send("Juice Machine Server Running")

})


// ESP32 checks payment here

app.get("/check",(req,res)=>{

res.send(paymentStatus)

})


// Manual payment test

app.get("/pay",(req,res)=>{

paymentStatus="PAID"

console.log("Payment received")

res.send("Payment received")

})


// Reset after drink is dispensed

app.get("/reset",(req,res)=>{

paymentStatus="WAIT"

console.log("Machine reset")

res.send("Reset done")

})


// Razorpay webhook

app.post("/webhook",(req,res)=>{

try{

const event = req.body.event

console.log("Webhook event:",event)

if(event === "payment.captured"){

paymentStatus="PAID"

console.log("Payment captured")

}

res.status(200).send("Webhook received")

}

catch(error){

console.log(error)

res.status(500).send("Error")

}

})


// start server

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

console.log("Server running on port",PORT)

})
