const express = require("express")

const app = express()

app.use(express.json())

let paymentStatus = "WAIT"


/* ROOT */

app.get("/",(req,res)=>{

res.send("Juice Machine Server Running")

})


/* ESP32 CHECK PAYMENT */

app.get("/check",(req,res)=>{

res.send(paymentStatus)

/* reset after ESP reads */

if(paymentStatus=="PAID"){
paymentStatus="WAIT"
}

})


/* TEST PAYMENT */

app.get("/pay",(req,res)=>{

paymentStatus="PAID"

console.log("Manual payment triggered")

res.send("Payment received")

})


/* RAZORPAY WEBHOOK */

app.post("/webhook",(req,res)=>{

const event=req.body.event

console.log("Webhook:",event)

if(event=="payment.captured"){

paymentStatus="PAID"

console.log("Payment captured")

}

res.send("ok")

})


app.listen(3000,()=>{

console.log("Server running")

})
