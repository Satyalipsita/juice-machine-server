const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

let paymentStatus = "WAIT"

// webhook from razorpay
app.post("/webhook", (req,res)=>{

let event = req.body.event

if(event == "payment.captured")
{
paymentStatus = "PAID"
console.log("Payment Confirmed")
}

res.status(200).send("OK")

})

// esp32 checks payment
app.get("/check",(req,res)=>{

res.send(paymentStatus)

if(paymentStatus=="PAID")
{
paymentStatus="WAIT"
}

})

app.listen(3000,()=>{
console.log("Server running")
})
