var mongoose = require("mongoose");
var config = require("./config");

exports.dbOpen = function() {
  const { db: { host, port, name } } = config;
  const connectionString = `mongodb://${host}:${port}/${name}`;
  mongoose.connect(connectionString);
};

exports.dbClose = function() {
  mongoose.connection.close;
};
