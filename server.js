/*********************************************************************************
 * WEB322 – Assignment 03
 * I declare that this assignment is my own work in accordance with Seneca's* Academic Integrity Policy:
 * hRps://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 * ** Name: CESCA DELA CRUZ
 * Student ID: 123123150
 * Date: 11/27/23
 *  * URL TO PROJECT: https://long-teal-coypu-hat.cyclic.app
 * *********************************************************************************/

// https://webprogrammingtoolsandframeworks.sdds.ca/Web-Server-Introduction/simple-web-server-using-expressjs
//const path = require("path");
const express = require("express");
const path = require("path");
const app = express();

// ensures that functions will be available on legoData obj
const legoData = require("./modules/legoSets");
legoData.initialize();
app.use(express.static("public")); // added to make my CSS file show

// respond to GET request on the "/" route
app.get("/", (req, res) => {
  // res.send(`Assignment 2: Anna Francesca Dela Cruz (Cesca) - 123123150`);
  // res.sendFile(path.join(__dirname, "index.html")); // display HTML page
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

// respond with all of the Lego sets from our legoData module
app.get("/lego/sets", (req, res) => {
  // https://webprogrammingtoolsandframeworks.sdds.ca/Handling-Asynchronous-Code/promises-async-await
  /*legoData
    .getAllSets() // call corresponding func; if found, send all sets
    .then((sets) => {
      res.send(sets);
    })
    .catch((error) => {
      console.log("Lego sets not sent!!!");
    });*/

  const themeQuery = req.query.theme;

  if (themeQuery) {
    legoData
      .getSetsByTheme(themeQuery) // get sets of theme
      .then((sets) => {
        if (sets) {
          res.send(sets);
        } else {
          res.status(404).send("404: NO SETS WITH THEME!!!!!");
          res.sendFile(path.join(__dirname, "views", "404.html"));

          // https://expressjs.com/en/starter/faq.html#:~:text=All%20you%20need%20to%20do,status(404).
        }
      });
  } else {
    legoData
      .getAllSets()
      .then((sets) => {
        res.send(sets);
      })
      .catch((error) => {
        console.log("Lego sets not sent!!!");
      });
  }
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
        res.send(set);
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
        res.send(set);
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
        res.send(set);
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
        res.send(set);
      }
    })
    .catch((error) => {
      console.log("Error found (num-demo): ", error);
    });
});

// invoke the function with a known theme value from your data set. Once the function has resolved successfully, respond with the returned obj
/*app.get("/lego/sets/theme-demo", (req, res) => {
  const knownTheme = "tech";
  legoData
    .getSetsByTheme(knownTheme) // call corresponding func
    .then((sets) => {
      if (sets) {
        // if set found send objs
        res.send(sets);
      }
    })
    .catch((error) => {
      console.log("Error found (theme-demo): ", error);
    });
}); */

const HTTP_PORT = process.env.PORT || 3000;

// start the server on the port; Needed to listen for incoming requests
app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
