/* eslint-disable */
export type AffiliateLinkRequest = {
  partnerName?: string | null | undefined;
  affiliateLink?: string | null | undefined;
}

export type CreateAffiliateLinkRequest = {
  affiliateLinkRequests?: AffiliateLinkRequest[] | null | undefined;
}

export type CreateBookRequest = {
  title?: string | null | undefined;
  author?: string | null | undefined;
  imageUrl?: string | null | undefined;
  description?: string | null | undefined;
  rating?: number | undefined;
  isbn?: string | null | undefined;
  language?: string | null | undefined;
  categoryIds?: string[] | null | undefined;
}

export type DetailError = {
  field?: string | null | undefined;
  value?: string | null | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
}

export type GetAffiliateLinkResponse = {
  id?: string | undefined;
  partnerName?: string | null | undefined;
  link?: string | null | undefined;
}

export type GetBookResponse = {
  id?: string | undefined;
  title?: string | null | undefined;
  author?: string | null | undefined;
  imageUrl?: string | null | undefined;
  averageRating?: number | undefined;
  description?: string | null | undefined;
  isbn?: string | null | undefined;
  language?: string | null | undefined;
  categories?: GetCategoryResponse[] | null | undefined;
  affiliateLinks?: GetAffiliateLinkResponse[] | null | undefined;
  favoriteCount?: number | undefined;
}

export type GetBookResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetBookResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetBookResponsePagingResponse = {
  items?: GetBookResponse[] | null | undefined;
  totalItems?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
}

export type GetBookResponsePagingResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetBookResponsePagingResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetCategoryResponse = {
  id?: string | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export type GetUserResponse = {
  userId?: string | undefined;
  fullName?: string | null | undefined;
  userName?: string | null | undefined;
  email?: string | null | undefined;
  address?: string | null | undefined;
  dateOfBirth?: string | undefined;
  avatarUrl?: string | null | undefined;
  roleId?: string | undefined;
  roleName?: string | null | undefined;
}

export type GetUserResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetUserResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetUserResponsePagingResponse = {
  items?: GetUserResponse[] | null | undefined;
  totalItems?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
}

export type GetUserResponsePagingResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetUserResponsePagingResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type LoginRequest = {
  userName?: string | null | undefined;
  password?: string | null | undefined;
}

export type ProblemDetails = {
  type?: string | null | undefined;
  title?: string | null | undefined;
  status?: number | null | undefined;
  detail?: string | null | undefined;
  instance?: string | null | undefined;
}

export type RegisterRequest = {
  userName?: string | null | undefined;
  email?: string | null | undefined;
  password?: string | null | undefined;
  confirmPassword?: string | null | undefined;
  fullName?: string | null | undefined;
  address?: string | null | undefined;
  dateOfBirth?: string | undefined;
}

export type StringApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: string | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type TokenRequest = {
  userId?: string | undefined;
  refreshToken?: string | null | undefined;
}

export type TokenResponse = {
  accessToken?: string | null | undefined;
  refreshToken?: string | null | undefined;
}

export type TokenResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: TokenResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}
