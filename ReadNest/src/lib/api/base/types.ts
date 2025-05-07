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
