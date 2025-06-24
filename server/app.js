const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const projectRoutes = require("./routes/project");
app.use("/api/projects", projectRoutes);

const uploadRoutes = require("./routes/upload");
app.use("/api/uploads", uploadRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/client/build")));

// API routes here...

// The "catchall" handler: for any request that doesn't match an API route, send back React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
