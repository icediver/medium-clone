export interface IPaginationInterface {
	page?: number;
	total: number;
	limit: number;
	url: string;
	currentPage: number;
}
