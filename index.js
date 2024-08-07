const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const app = express();
const port = 8000;
connectDB();
app.use(express.json());
app.use(cors());

// Import route files
const userRoutes = require("./src/Routes/userRoutes");
const roomRoutes = require("./src/Routes/roomRoutes");
const bookingRoutes = require("./src/Routes/bookingRoutes");

// Use routes
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
