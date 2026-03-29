const express = require("express");
const path = require("path");
const cors = require("cors");

function setupMiddleware(app) {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // بدل public → خليه يخدم على نفس الفولدر
  app.use(express.static(__dirname));
}

function setupRoutes(app) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.post("/send", (req, res) => {
    const message = req.body.message;

    console.log("📩 New Message:");
    console.log(message);

    res.json({ success: true });
  });
  
  app.post("/order", handleOrder);
  function handleOrder(req, res) {
  const order = req.body;

  console.log("🧾 New Order:");
  console.log(order);

  res.json({ success: true });
}



}

function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  setupMiddleware(app);
  setupRoutes(app);

  app.listen(PORT, () => {
    console.log("🚀 Server running");
  });
}

startServer();