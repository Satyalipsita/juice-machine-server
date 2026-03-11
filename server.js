const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

let paymentStatus = "waiting"

/* PAYMENT STATUS API */

app.get("/payment-status",(req,res)=>{

res.send(paymentStatus)

})

/* RAZORPAY WEBHOOK */

app.post("/webhook",(req,res)=>{

const event = req.body.event

if(event === "payment.captured"){

paymentStatus="paid"

}

res.status(200).send("ok")

})

/* RESET AFTER DISPENSE */

app.get("/reset",(req,res)=>{

paymentStatus="waiting"

res.send("reset")

})

app.listen(3000,()=>{

console.log("Server Running")

})

