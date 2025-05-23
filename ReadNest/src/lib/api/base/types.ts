export interface ApiResponse<T> {
  success: boolean;
  messageId: string;
  message: string;
  data?: T;
  listDetailError?: DetailError[];
}

export interface DetailError {
  field: string;
  value?: string;
  messageId: string;
  message: string;
}

export interface PagingRequest {
  pageIndex: number;
  pageSize: number;
}

export type PagingResponse<T> = {
  items?: T[] | null | undefined;
  totalItems?: number;
  pageIndex?: number;
  pageSize?: number;
};
