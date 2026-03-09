const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
res.send("Juice Machine Server Running");
});

app.post("/razorpay-webhook",(req,res)=>{

console.log("Webhook Received");

let payment = req.body.payload.payment.entity;

if(payment.status == "captured")
{
console.log("Payment Successful");
triggerJuice();
}

res.send("ok");

});

function triggerJuice()
{
axios.get("http://YOUR_ESP32_IP/dispense")
.then(()=>{
console.log("Juice Dispensed");
})
.catch(err=>{
console.log(err);
});
}

app.listen(10000,()=>{
console.log("Server Started");
});
