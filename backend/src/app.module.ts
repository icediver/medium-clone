import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticleModule } from "./article/article.module";
import { DatabaseModule } from "./database/database.module";
import { MediaModule } from "./media/media.module";
import { ProfileModule } from "./profile/profile.module";
import { TagModule } from "./tag/tag.module";
import { AuthMiddleware } from "./user/middlewares/auth.middleware";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TagModule,
    DatabaseModule,
    UserModule,
    ArticleModule,
    ProfileModule,
    MediaModule
  
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    });
  }
}
