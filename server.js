const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname))

let clients = []

// ROOT
app.get("/",(req,res)=>{
res.send("Juice Machine Server Running")
})


// SSE CONNECTION FROM ESP UI

app.get("/events",(req,res)=>{

res.setHeader("Content-Type","text/event-stream")
res.setHeader("Cache-Control","no-cache")
res.setHeader("Connection","keep-alive")

res.flushHeaders()

clients.push(res)

req.on("close",()=>{
clients = clients.filter(c=>c!==res)
})

})


// FUNCTION TO SEND EVENT TO ESP32

function sendPayment(){

clients.forEach(client=>{
client.write(`data: PAID\n\n`)
})

console.log("Payment pushed to ESP32")

}



// TEST PAYMENT

app.get("/pay",(req,res)=>{

sendPayment()

res.send("Payment simulated")

})


// RAZORPAY WEBHOOK

app.post("/webhook",(req,res)=>{

try{

const event=req.body.event

console.log("Webhook event:",event)

if(event==="payment.captured"){

sendPayment()

}

res.status(200).send("Webhook received")

}

catch(err){

console.log(err)

res.status(500).send("error")

}

})



const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

console.log("Server running on port",PORT)

})
