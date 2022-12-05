import { Optional } from '@nestjs/common';

export class UpdateArticleDto {
  @Optional()
  readonly title: string;

  @Optional()
  readonly description: string;

  @Optional()
  readonly body: string;
  @Optional()
  readonly tagList?: string[];
}
