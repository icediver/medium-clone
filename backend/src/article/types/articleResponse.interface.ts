import { ArticleEntity } from "../article.entity";

export type ArticleType = Omit<ArticleEntity, "updateTimestamp">;

export interface ArticleResponseInterface {
  article: ArticleType;
  // favorited: boolean;
}
