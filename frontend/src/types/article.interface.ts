import { IUserInterface } from './user.interface';

export interface IArticleBase {
	title: string;
	description: string;
	body: string;
	tagList: string[];
}

export interface IArticleInterface extends IArticleBase {
	id: number;
	slug: string;
	createdAt: Date;
	updatedAt: Date;
	favorited?: boolean;
	favoriteCount: number;
	author: IUserInterface;
	comments: string[];
}
