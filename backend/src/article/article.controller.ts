import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from "@nestjs/common";
import { BackendValidationPipe } from "../shared/pipes/backendValidation.pipe";
import { User } from "../user/decorators/user.decorator";
import { AuthGuard } from "../user/guards/auth.guard";
import { UserEntity } from "../user/user.entity";
import { ArticleService } from "./article.service";
import { CommentEntity } from "./comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import { ArticlesResponseInterface } from "./types/articlesResponse.interface";

@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }
  
  //------------Create-------------------
  /**
   * Create Articles
   * @param currentUser
   * @param createArticleDto
   */
  @Post()
  @UsePipes(new BackendValidationPipe())
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body("article") createArticleDto: CreateArticleDto
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto
    );
    return this.articleService.buildArticleResponse(article, currentUser.id);
  }
  
  /**
   * Create new Commentary for Article
   
   * @param currentUser
   * @param commentDto
   * @param slug
   */
  @Post(":slug/comments")
  @UsePipes(new BackendValidationPipe())
  @UseGuards(AuthGuard)
  async createComment(
    @User() currentUser: UserEntity,
    @Body("comment") commentDto: CreateCommentDto,
    @Param("slug") slug: string
  ): Promise<CommentEntity> {
    const comment = await this.articleService.createComment(
      currentUser,
      commentDto,
      slug
    );
    return comment;
  }
  
  //------------Read---------------------
  
  @Get()
  async findAll(
    @User("id") currentUserId: number,
    @Query() query: any
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(currentUserId, query);
  }
  
  @Get("feed")
  @UseGuards(AuthGuard)
  async getFeed(
    @User("id") currentUserId: number,
    @Query() query: any
  ): Promise<ArticlesResponseInterface> {
    return this.articleService.getFeed(currentUserId, query);
  }
  
  @Get(":slug")
  async getArticleBySlug(
    @Param("slug") slug: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.getArticleBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }
  
  @Get(":slug/comments")
  async getComments(@Param("slug") slug: string): Promise<any> {
    const comments = await this.articleService.getComments(slug);
    return this.articleService.buildCommentsResponse(comments);
  }
  
  //------------Update-------------------
  @Put(":slug")
  @UsePipes(new BackendValidationPipe())
  @UseGuards(AuthGuard)
  async updateArticle(
    @User("id") currentUserId: number,
    @Param("slug") slug: string,
    @Body("article") createArticleDto: CreateArticleDto
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.updateArticle(
      slug,
      currentUserId,
      createArticleDto
    );
    return this.articleService.buildArticleResponse(article);
  }
  
  @Post(":slug/favorite")
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @User("id") currentUserId: number,
    @Param("slug") slug: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavorites(
      slug,
      currentUserId
    );
    return this.articleService.buildArticleResponse(article);
  }
  
  @Delete(":slug/favorite")
  @UseGuards(AuthGuard)
  async deleteArticleFromFavorites(
    @User("id") currentUserId: number,
    @Param("slug") slug: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.deleteArticleFromFavorites(
      slug,
      currentUserId
    );
    return this.articleService.buildArticleResponse(article);
  }
  
  //------------Delete-------------------
  @Delete(":slug")
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User("id") currentUserId: number,
    @Param("slug") slug: string
  ) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }
  
  @Delete(":slug/comments/:id")
  @UseGuards(AuthGuard)
  async deleteComment(
    @User("id") currentUserId: number,
    @Param("slug") slug: string,
    @Param("id") id: string
  ) {
    return await this.articleService.deleteComment(currentUserId, slug, id);
  }
}
