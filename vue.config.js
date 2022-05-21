module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/weather-app/" : "/",

    configureWebpack: {
      plugins: [new Dotenv()],
    },
  };