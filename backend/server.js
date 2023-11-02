require("dotenv").config();
const express = require("express");
const constants = require("./config/constants");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cron = require("node-cron");
const PORT = process.env.PORT || 3500;
const User = require("./models/User");

mongoose.set("strictQuery", false);

// Connect to MongoDB
connectDB();

// Handle options credentials check
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/newpassword", require("./routes/newpassword"));

//in questo middleware vengono settati req.authorized, req.username, req.id e req.isMod tramite i dati contenuti nel token
//per accedere a tutte le routes sotto bisogna essere loggati
app.use(verifyJWT);

app.use("/feed", require("./routes/feed"));
app.use("/users", require("./routes/users"));
app.use("/squeals", require("./routes/squeals"));
app.use("/channels", require("./routes/channels"));
app.use("/keywords", require("./routes/keywords"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  cron.schedule("0 0 * * *", async () => {
    const users = User.find({});
    for (const user of users) {
      user.dailyChar = constants.DAILY_CHAR;
      await user.save({});
    }
    console.log("Reset quota giornaliera");
  });
  cron.schedule("0 0 * * 0", async () => {
    const users = User.find({});
    for (const user of users) {
      user.weeklyChar = constants.WEEKLY_CHAR;
      await user.save({});
    }
    console.log("Reset quota settimanale");
  });
  cron.schedule("0 0 1 * *", async () => {
    const users = User.find({});
    for (const user of users) {
      user.weeklyChar = constants.MONTHLY_CHAR;
      await user.save({});
    }
    console.log("Reset quota mensile");
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
