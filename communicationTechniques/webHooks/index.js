// Import necessary modules
const express = require("express");
const axios = require("axios"); // Used to send HTTP requests
const bodyParser = require("body-parser");
const { join } = require("path");

const app = express();
const port = 3000;

// Middleware to parse JSON data in POST requests
app.use(bodyParser.json());

// Serve the index.html file when the root URL is requested
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Webhook receiver endpoint
app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body); // Log the received data
  // Respond to the sender
  res.status(200).send("Webhook received successfully");
});

// Endpoint to simulate an event and send a webhook
app.post("/trigger-event", async (req, res) => {
  // Data to send in the webhook
  const eventData = {
    message: "An event has occurred!",
    timestamp: new Date(),
  };

  try {
    // Send a POST request to the webhook receiver (simulating a webhook)
    const response = await axios.post(
      `http://localhost:${port}/webhook`,
      eventData
    );
    console.log("Webhook sent:", eventData);
    res.status(200).send("Event triggered and webhook sent");
  } catch (error) {
    console.error("Error sending webhook:", error);
    res.status(500).send("Error triggering event");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
