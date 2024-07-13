// const UserRepository = require("./models/UserRepository");
const GameRepository = require("./repositories/GameRepository");

const tables = {};

// tables.user = new UserRepository();
tables.video_game = new GameRepository();

module.exports = new Proxy(tables, {
  get(obj, prop) {
    if (prop in obj) return obj[prop];

    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});