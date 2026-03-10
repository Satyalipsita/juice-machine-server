const express = require("express");
const app = express();

app.use(express.static(__dirname));
app.use(express.json()); // To parse webhook POST JSON

let paymentStatus = "WAIT";

app.get("/", (req,res) => {
    res.send("Juice Machine Server Running");
});

app.get("/pay", (req,res) => {
    paymentStatus = "PAID";
    res.send("Payment received");
});

app.get("/check", (req,res) => {
    res.send(paymentStatus);
    // DO NOT reset here if using ESP32 auto detection
});

// ESP32 will call this to reset after dispensing
app.get("/reset_payment", (req,res) => {
    paymentStatus = "WAIT";
    res.send("Payment reset to WAIT");
});

// Razorpay webhook
app.post("/razorpay_webhook", (req, res) => {
    const event = req.body.event;
    console.log("Webhook received:", event);

    if(event === "payment.captured"){
        paymentStatus = "PAID";
        console.log("Payment captured via Razorpay webhook");
    }

    res.status(200).send("OK");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
