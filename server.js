const express = require("express")

const app = express()

app.use(express.json())

// payment status
let paymentStatus = "WAIT"


// home
app.get("/", (req,res)=>{

res.send("Juice Machine Server Running")

})


// check payment (ESP32 calls this)

app.get("/check",(req,res)=>{

res.send(paymentStatus)

if(paymentStatus=="PAID"){

paymentStatus="WAIT"

}

})


// simulate payment (for testing)

app.get("/pay",(req,res)=>{

paymentStatus="PAID"

console.log("Payment simulated")

res.send("Payment received")

})


// webhook from Razorpay

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


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

console.log("Server running on port",PORT)

})
