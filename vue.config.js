const Dotenv = require("dotenv-webpack");

module.exports = {
    // publicPath: process.env.NODE_ENV === "production" ? "/weather-app/" : "/",
    publicPath: "/",

    configureWebpack: {
      plugins: [new Dotenv()],
    },
  };