const AbstractRepository = require("./AbstractRepository");

class GameRepository extends AbstractRepository {
  constructor() {
    super({ table: "video_game" });
  }

  async readAll() {
    const [results] = await this.database.query(`SELECT * FROM ${this.table}`);
    return results;
  }

  async create(name, year, devTeam) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, year, dev_team) VALUES (?, ?, ?)`,
      [name, year, devTeam]
    );

    return result.insertId;
  }
}

module.exports = GameRepository;
