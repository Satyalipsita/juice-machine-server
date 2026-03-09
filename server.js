

const express = require("express")

const app = express()
app.use(express.static(__dirname));
let paymentStatus = "WAIT"

app.get("/",(req,res)=>{
res.send("Juice Machine Server Running")
})

app.get("/pay",(req,res)=>{

paymentStatus="PAID"

res.send("Payment received")

})

app.get("/check",(req,res)=>{

res.send(paymentStatus)

paymentStatus="WAIT"

})

app.listen(3000,()=>{
console.log("Server started")
})

