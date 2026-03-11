const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname))

// PAYMENT STATUS
let paymentStatus = "WAIT"


// ROOT CHECK
app.get("/", (req,res)=>{

res.send("Juice Machine Server Running")

})


// SIMULATE PAYMENT (FOR TESTING)

app.get("/pay",(req,res)=>{

paymentStatus="PAID"

console.log("Payment simulated")

res.send("Payment received")

})


// ESP32 CHECK PAYMENT

app.get("/check",(req,res)=>{

res.send(paymentStatus)

// IMPORTANT: RESET AFTER CHECK

if(paymentStatus=="PAID"){

paymentStatus="WAIT"

}

})


// RESET MANUALLY

app.get("/reset",(req,res)=>{

paymentStatus="WAIT"

res.send("Payment reset")

})



// RAZORPAY WEBHOOK

app.post("/webhook",(req,res)=>{

try{

const event=req.body.event

console.log("Webhook event:",event)

if(event==="payment.captured"){

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



// SERVER START

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{

console.log("Server running on port",PORT)

})
