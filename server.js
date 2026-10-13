const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const checkToken = require("./middleware/checkToken");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/auth", authRoutes);
console.log("Auth routes loaded");
app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});

app.get("/", (req, res) => {
  res.send("AI chat application Server is runing");
});
app.post("/test", (req, res) => {
    console.log("Test API hit");

    res.json({
        message: "Test API working"
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});