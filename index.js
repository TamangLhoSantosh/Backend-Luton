const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const app = express();
const port = 8000;
connectDB();
app.use(express.json());
app.use(cors());

// Import route files
const authRoutes = require("./src/Routes/authRoutes");
const userRoutes = require("./src/Routes/userRoutes");
const roomRoutes = require("./src/Routes/roomRoutes");
const roomTypeRoutes = require("./src/Routes/roomTypeRoutes");
const bookingRoutes = require("./src/Routes/bookingRoutes");

// Use routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/roomType", roomTypeRoutes);
app.use("/room", roomRoutes);
app.use("/booking", bookingRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
