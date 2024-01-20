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
const Squeal = require("./models/Squeal");
const Channel = require("./models/Channel");
const fileupload = require("express-fileupload");

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

//middleware for file upload
app.use(fileupload());

//serve static files
app.use(express.static("public"));

// routes
app.use("/api/register", require("./routes/register"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/refresh", require("./routes/refresh"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/newpassword", require("./routes/newpassword"));

//in questo middleware vengono settati req.authorized, req.username, req.id e req.isMod tramite i dati contenuti nel token
//per accedere a tutte le routes sotto bisogna essere loggati
app.use(verifyJWT);

app.use("/api/feed", require("./routes/feed"));
app.use("/api/users", require("./routes/users"));
app.use("/api/squeals", require("./routes/squeals"));
app.use("/api/channels", require("./routes/channels"));
app.use("/api/keywords", require("./routes/keywords"));

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
    try {
      createWikiSqueal();
      createNorrisSqueal();
      console.log("Squeal automatici creati");
    } catch (error) {
      console.log("Errore nella creazione degli squeal automatici: ", error);
    }
  });

  cron.schedule("0 0 * * *", async () => {
    const users = await User.find({});
    for (const user of users) {
      if (user.aumentoDuration < Date.now()) {
        user.aumentoQuota = 0;
      }
      user.dailyChar = constants.DAILY_CHAR + user.aumentoQuota;
      await user.save({});
    }
    console.log("Reset quota giornaliera");
  });
  cron.schedule("0 0 * * 0", async () => {
    const users = await User.find({});
    for (const user of users) {
      user.weeklyChar = constants.WEEKLY_CHAR + user.aumentoQuota;
      await user.save({});
    }
    console.log("Reset quota settimanale");
  });
  cron.schedule("0 0 1 * *", async () => {
    const users = await User.find({});
    for (const user of users) {
      user.weeklyChar = constants.MONTHLY_CHAR + user.aumentoQuota;
      await user.save({});
    }
    console.log("Reset quota mensile");
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

function createWikiSqueal() {
  var url = "https://en.wikipedia.org/w/api.php";

  const params = {
    format: "json",
    action: "query",
    generator: "random",
    grnnamespace: 0,
    prop: "extracts",
    exintro: true,
    explaintext: true,
    grnlimit: "1",
  };

  url = url + "?";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(async function (response) {
      const pages = response.query.pages;

      for (const i in pages) {
        let channel = await Channel.findOne({
          name: "WIKIPEDIA",
        });
        if (!channel)
          channel = await Channel.create({
            name: "WIKIPEDIA",
            description: "Random facts from wikipedia",
            private: false,
            editorialChannel: true,
          });
        await Squeal.create({
          author: "6515e4fbf2b9aa95e4c6e42b", //serve l'id di un utente che rappresenta Squealer, questo è "filo"
          receivers: [
            {
              group: channel._id,
              groupType: "Channel",
            },
          ],
          officialChannel: true,
          content: pages[i].extract,
          contentType: "text",
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function createNorrisSqueal() {
  const url =
    "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-RapidAPI-Key": "06c330c9d9msh4b91588776642fep1ba2f7jsnb17304ffd2a9",
      "X-RapidAPI-Host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    let channel = await Channel.findOne({
      name: "CHUCK NORRIS",
    });
    if (!channel)
      channel = await Channel.create({
        name: "CHUCK NORRIS",
        description: "Random jokes by Chuck Norris",
        private: false,
        editorialChannel: true,
      });
    await Squeal.create({
      author: "6515e4fbf2b9aa95e4c6e42b", //serve l'id di un utente che rappresenta Squealer, questo è "filo"
      receivers: [
        {
          group: channel._id,
          groupType: "Channel",
        },
      ],
      officialChannel: true,
      content: result.value,
      contentType: "text",
    });
  } catch (error) {
    console.error(error);
  }
}
