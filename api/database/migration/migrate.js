// Load environment variables from .env file
require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");

// Build the path to the schema SQL file
const schema = path.join(__dirname, "..", "schema.sql");

// Get database connection details from .env file
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Update the database schema
const mysql = require("mysql2/promise");

const migrate = async () => {
  try {
    // Read the SQL statements from the schema file
    const sql = fs.readFileSync(schema, "utf8");

    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // Allow multiple SQL statements
    });

    await database.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);

    await database.query(`CREATE DATABASE ${DB_NAME}`);

    await database.query(`USE ${DB_NAME}`);

    await database.query(sql);

    // Close the database connection
    database.end();

    console.info(`${DB_NAME} updated from '${path.normalize(schema)}' 🆙`);
  } catch (err) {
    console.error("Error updating the database:", err.message, err.stack);
  }
};

// Run the migration function
migrate();