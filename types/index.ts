// Global type definitions

export type BaseEntity = {
  id: string | number;
  created_at?: string;
  updated_at?: string;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  offset?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
