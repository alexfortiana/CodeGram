// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

hbs.registerHelper("language", function (lang) {
  switch (lang) {
    case "css":
      return "language-css";
      break;
    case "html":
      return "language-html";
      break;
    case "js":
      return "language-js";
      break;
    case "py":
      return "language-py";
      break;
  }
});

hbs.registerHelper("count", (arrayToCount)=> {
  return arrayToCount.length;
});

hbs.registerHelper("isOwner", (ownerId)=>{
  if(ownerId._id.toString() === app.locals.user._id){
    return "flex"
  }else{
    return "none"
  }
})

hbs.registerHelper("isOwnerMsg", (ownerId)=>{
  if(ownerId._id.toString() === app.locals.user._id){
    return ""
  }else{
    return "margin-left"
  }
})

hbs.registerHelper("userLiked", (likeArray, empty)=>{
  if (likeArray.includes(app.locals.user._id)){
    if (empty){
      return "in-line"
    } else{
      return "none"
    }
  }else{
    if (empty){
      return "none"
    } else{
      return "in-line"
    }
  }
})



const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "codeGram";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
