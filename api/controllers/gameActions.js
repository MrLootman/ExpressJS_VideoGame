const tables = require("../models/tables");

const browse = async (req, res) => {
  try {
    const videoGames = await tables.video_game.readAll();

    res.status(200).send(videoGames);
  } catch (err) {
    console.error(err);
  }
};

const add = async (req, res) => {
  try {
    const { name, year, devTeam } = req.body;

    const insertId = await tables.video_game.create(name, year, devTeam);

    if (insertId) {
      return res
        .status(201)
        .send(`A new video game has been created with the id ${insertId}`);
    }

    return res.status(404).send(`Problem with the video game`);
  } catch (err) {
    console.error("Server Error : ", err);
  }
};

module.exports = { browse, add };
