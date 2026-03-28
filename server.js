const express = require("express");
const path = require("path");

// إعداد middleware
function setupMiddleware(app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // لعرض الملفات (HTML, CSS, JS)
    app.use(express.static(__dirname));
}

// إعداد routes
function setupRoutes(app) {

    // الصفحة الرئيسية
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "index.html"));
    });

    // استقبال الرسالة من الفورم
    app.post("/send", (req, res) => {
        handleForm(req, res);
    });
}

// فنكشن معالجة الفورم
function handleForm(req, res) {
    const message = req.body.message; 

    console.log("📩 New Message:");
    console.log("\u202B" + message);

    res.json({ success: true }); // ✔ أحسن من send
}

// تشغيل السيرفر
function startServer() {
    const app = express();
    const PORT = process.env.PORT || 3000;

    setupMiddleware(app);
    setupRoutes(app);

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

// تشغيل
startServer();


