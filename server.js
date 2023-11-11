// https://webprogrammingtoolsandframeworks.sdds.ca/Web-Server-Introduction/simple-web-server-using-expressjs
//const path = require("path");
const express = require("express");
const path = require("path");
const app = express();

// view to EJS
app.set("view engine", "ejs");

// ensures that functions will be available on legoData obj
const legoData = require("./modules/legoSets");
legoData.initialize();
app.use(express.static("public")); // added to make my CSS file show

// respond to GET request on the "/" route
app.get("/", (req, res) => {
  // res.send(`Assignment 2: Anna Francesca Dela Cruz (Cesca) - 123123150`);
  // res.sendFile(path.join(__dirname, "index.html")); // display HTML page
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/404", (req, res) => {
  res.render("404");
});

// demonstrate the getSetByNum functionality, by invoking it with a known setNum value from your data set
// Once the function has resolved successfully, respond with the returned object
// Do not forget to handle the situaAon where getSetByNum fails
app.get("/lego/sets/num-demo", (req, res) => {
  const knownSetNum = "001-1"; // known setNum
  legoData
    .getSetByNum(knownSetNum) // call corresponding func
    .then((set) => {
      if (set) {
        // if set found send obj
        //res.render("set", { set: set });
        //res.render("sets", { sets: set });
      }
    })
    .catch((error) => {
      console.log("Error found (num-demo): ", error);
    });
});

app.get("/lego/sets/0011-3", (req, res) => {
  const knownSetNum = "0011-3"; // known setNum
  legoData
    .getSetByNum(knownSetNum) // call corresponding func
    .then((set) => {
      if (set) {
        // if set found send obj
        res.render("set", { set: set });
        //res.render("sets", { sets: set });
      }
    })
    .catch((error) => {
      console.log("Error found (num-demo): ", error);
    });
});

app.get("/lego/sets/001-1", (req, res) => {
  const knownSetNum = "001-1"; // known setNum
  legoData
    .getSetByNum(knownSetNum) // call corresponding func
    .then((set) => {
      if (set) {
        // if set found send obj
        res.render("set", { set: set });
        //res.render("sets", { sets: sets });
      }
    })
    .catch((error) => {
      console.log("Error found (num-demo): ", error);
    });
});

app.get("/lego/sets/0011-2", (req, res) => {
  const knownSetNum = "0011-2"; // known setNum
  legoData
    .getSetByNum(knownSetNum) // call corresponding func
    .then((set) => {
      if (set) {
        // if set found send obj
        res.render("set", { set: set });
        //res.render("sets", { sets: set });
      }
    })
    .catch((error) => {
      console.log("Error found (num-demo): ", error);
    });
});

// respond with all of the Lego sets from our legoData module
app.get("/lego/sets", (req, res) => {
  const themeQuery = req.query.theme;

  if (themeQuery) {
    legoData
      .getSetsByTheme(themeQuery) // get sets of theme
      .then((sets) => {
        if (sets) {
          //res.send(sets);
          res.render("sets", { sets: sets }); //part
        } else {
          res.status(404).send("404: NO SETS WITH THEME!!!!!");
          res.render("404");

          // https://expressjs.com/en/starter/faq.html#:~:text=All%20you%20need%20to%20do,status(404).
        }
      });
  } else {
    legoData
      .getAllSets()
      .then((sets) => {
        //res.send(sets);
        res.render("sets", { sets: sets });
      })
      .catch((error) => {
        console.log("Lego sets not sent!!!");
      });
  }
});

const HTTP_PORT = process.env.PORT || 3001;

// start the server on the port; Needed to listen for incoming requests
app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));

// npm run tw:build
