const express = require("express")
const app = express()

app.use(express.json())

let paymentStatus="WAIT"

app.get("/",(req,res)=>{
res.send("Juice Machine Server Running")
})

app.get("/check",(req,res)=>{
res.send(paymentStatus)
})

app.get("/pay",(req,res)=>{
paymentStatus="PAID"
res.send("Payment received")
})

app.post("/webhook",(req,res)=>{

console.log("Webhook received")

if(req.body.event=="payment.captured"){
paymentStatus="PAID"
console.log("Payment captured")
}

res.status(200).send("OK")

})

const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
console.log("Server running")
})
