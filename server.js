const express = require("express");
const app = express();

app.use(express.json());

let paymentStatus = "WAIT";

// Home page
app.get("/", (req, res) => {
  res.send("Juice Machine Server Running");
});

// ESP32 checks payment
app.get("/check", (req, res) => {
  res.send(paymentStatus);
});

// Test payment manually
app.get("/pay", (req, res) => {
  paymentStatus = "PAID";
  console.log("Payment received");
  res.send("Payment successful");
});

// Razorpay webhook
app.post("/webhook", (req, res) => {
  const event = req.body.event;

  console.log("Webhook event:", event);

  if (event === "payment.captured") {
    paymentStatus = "PAID";
    console.log("Payment captured");
  }

  res.status(200).send("OK");
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
