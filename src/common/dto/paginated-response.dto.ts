export class PaginatedResponse<T> {
  data: T[];
  total: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
