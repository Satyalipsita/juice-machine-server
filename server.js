const express = require("express")
const app = express()

app.use(express.json())

let paymentStatus = "WAIT"

// Home page
app.get("/", (req,res)=>{
res.send("Juice Machine Server Running")
})

// ESP32 checks payment here
app.get("/check",(req,res)=>{
res.send(paymentStatus)
})

// Manual test trigger
app.get("/pay",(req,res)=>{
paymentStatus="PAID"
res.send("Payment received")
})

// Razorpay webhook
app.post("/webhook",(req,res)=>{

const event=req.body.event

if(event=="payment.captured"){
paymentStatus="PAID"
console.log("Payment captured")
}

res.status(200).send("OK")

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
console.log("Server running on port "+PORT)
})
