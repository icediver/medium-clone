import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: "localhost",
        port: configService.get("TYPEORM_PORT"),
        database: configService.get("TYPEORM_DATABASE"),
        username: configService.get("TYPEORM_USERNAME"),
        password: configService.get("TYPEORM_PASSWORD"),
        autoLoadEntities: true,
        synchronize: false
      })
    })
  ]
})
export class DatabaseModule {
}
