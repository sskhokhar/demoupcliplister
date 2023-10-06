import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { Asset } from "../asset/entities";

dotenv.config();

const entities = [Asset];

const pgConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || ""),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities,
};
const testConfig: DataSourceOptions = {
  type: "better-sqlite3",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities,
};

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test" ? testConfig : pgConfig,
);
