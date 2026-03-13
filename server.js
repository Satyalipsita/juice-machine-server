const express = require("express")

const app = express()

app.use(express.json())

/* PAYMENT STATE */

let paymentStatus = "WAIT"

/* HOME PAGE */

app.get("/", (req,res)=>{

res.send("Juice Machine Server Running")

})

/* RAZORPAY WEBHOOK */

app.post("/webhook",(req,res)=>{

try{

const event = req.body.event

console.log("Webhook Event:",event)

/* Razorpay successful payment */

if(event === "payment.captured"){

paymentStatus="PAID"

console.log("Payment captured → Machine unlocked")

}

res.status(200).send("Webhook received")

}

catch(err){

console.log(err)

res.status(500).send("Webhook error")

}

})

/* ESP32 CHECK PAYMENT */

app.get("/check",(req,res)=>{

res.send(paymentStatus)

/* reset after ESP reads */

paymentStatus="WAIT"

})

/* MANUAL TEST PAYMENT */

app.get("/pay",(req,res)=>{

paymentStatus="PAID"

res.send("Payment received (Test Mode)")

})

/* SERVER START */

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

console.log("Server running on port",PORT)

})
