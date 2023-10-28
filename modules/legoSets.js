/*********************************************************************************
 * WEB322 – Assignment 02
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 * Name: ANNA F. DELA CRUZ (CESCA) Student ID: 123123150 Date: OCT 16, 2023
 *********************************************************************************/

// automatcally read both files and generate two arrays of objects: "setData" and "themeData"
const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");
let sets = [];

// fill the "sets" array by adding copies of all the setData objs
// HINT: Consider using the .find() and .forEach() Array methods for your solution
function initialize() {
  new Promise((resolve) => {
    sets = setData.map((elem) => {
      // get theme_id of each elem
      const themeID = elem.theme_id;
      // find matching id from setData and themeData elems to get name
      const themeDataArr = themeData.find(
        (themeDataElem) => themeDataElem.id === themeID
      ).name;

      // unpack setData elements and combine with theme elem
      return { ...elem, theme: themeDataArr };
    });
    resolve();
  });
}
//initialize();
//console.log(sets);
function getAllSets() {
  return new Promise((resolve) => {
    resolve(sets);
  });
}

// return a specific "set" object from "sets" array using "setNum" parameter
function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const matchedSet = sets.find((elem) => {
      if (setNum == elem.set_num) {
        //console.log("test");
        return elem;
      }
    });

    // resolve with the found "set" object, and reject with an appropriatemessage (ie: unable to find requested set) if the set was not found
    // if (matchedSet == true) // does not work
    if (matchedSet) {
      resolve(matchedSet);
    } else {
      reject("No set found by NUM.");
    }
  });
}
//console.log(getSetByNum("001-1"));

// return an array from "sets" array whose "theme" partially matches the "theme" parameter
// Case is ignored
function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    // Search for sets by theme and resolve with the found sets
    // or reject with an error message if none are found
    const matchedSets = sets.filter((elem) => {
      if (elem.theme.toUpperCase().includes(theme.toUpperCase())) {
        return elem;
      }
    });
    // resolve with the found "set" objects, and reject with an appropriatemessage (ie: unable to find requested sets)
    if (matchedSets.length >= 1) {
      resolve(matchedSets);
    } else {
      reject("No sets found by THEME.");
    }
  });
}
//console.log(getSetsByTheme("tech"));

// make sure this file functions as a "module"
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
