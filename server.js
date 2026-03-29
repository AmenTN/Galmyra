const express = require("express");
const path = require("path");
const cors = require("cors");

function setupMiddleware(app) {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(express.static(path.join(__dirname, "public")));
}

function setupRoutes(app) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.post("/send", (req, res) => {
    const message = req.body.message;

    console.log("📩 New Message:");
    console.log(message);

    res.json({ success: true });
  });
}

function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  setupMiddleware(app);
  setupRoutes(app);

  app.listen(PORT, () => {
    console.log(`🚀 Server running`);
  });
}

startServer();