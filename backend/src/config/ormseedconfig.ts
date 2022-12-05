import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

const configService = new ConfigService();
export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: configService.get("TYPEORM_PORT"),
  database: configService.get("TYPEORM_DATABASE"),
  username: configService.get("TYPEORM_USERNAME"),
  password: configService.get("TYPEORM_PASSWORD"),
  synchronize: false,
  entities: ["src/**/*.entity{.js,.ts}"],
  migrations: ["src/seeds/*{.js,.ts}"],
  migrationsTableName: "custom_migration_table"
});
