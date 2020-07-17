const settings = require("./dev.appsettings.json");

module.exports = function (app) {
  app.use(/\/appsettings.json/, (req, res) => res.send(settings));
};
