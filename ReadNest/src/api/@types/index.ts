/* eslint-disable */
export type AffiliateLink = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  link?: string | null | undefined;
  partnerName?: string | null | undefined;
  bookId?: string | undefined;
  book?: Book | undefined;
}

export type Book = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  title?: string | null | undefined;
  author?: string | null | undefined;
  imageUrl?: string | null | undefined;
  avarageRating?: number | undefined;
  description?: string | null | undefined;
  favoriteBooks?: FavoriteBook[] | null | undefined;
  categories?: Category[] | null | undefined;
  affiliateLinks?: AffiliateLink[] | null | undefined;
  comments?: Comment[] | null | undefined;
}

export type Category = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  books?: Book[] | null | undefined;
}

export type Comment = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  content?: string | null | undefined;
  bookId?: string | undefined;
  userId?: string | undefined;
  book?: Book | undefined;
  creator?: User | undefined;
  likes?: User[] | null | undefined;
}

export type DetailError = {
  field?: string | null | undefined;
  value?: string | null | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
}

export type FavoriteBook = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  userId?: string | undefined;
  bookId?: string | undefined;
  user?: User | undefined;
  book?: Book | undefined;
}

export type GetCommentResponse = {
  commentId?: string | undefined;
  content?: string | null | undefined;
  bookId?: string | undefined;
  userId?: string | undefined;
  book?: Book | undefined;
  creatorName?: string | null | undefined;
  numberOfLikes?: number | undefined;
}

export type GetUserProfileResponse = {
  userId?: string | undefined;
  fullName?: string | null | undefined;
  userName?: string | null | undefined;
  email?: string | null | undefined;
  address?: string | null | undefined;
  dateOfBirth?: string | undefined;
  avatarUrl?: string | null | undefined;
  roleId?: string | undefined;
  roleName?: string | null | undefined;
  comments?: GetCommentResponse[] | null | undefined;
  numberOfPosts?: number | undefined;
  numberOfComments?: number | undefined;
  ratingScores?: number | undefined;
}

export type GetUserProfileResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetUserProfileResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
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

export type Role = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  roleName?: string | null | undefined;
  users?: User[] | null | undefined;
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

export type UpdateUserRequest = {
  userId?: string | undefined;
  fullName?: string | null | undefined;
  address?: string | null | undefined;
  dateOfBirth?: string | null | undefined;
  avatarUrl?: string | null | undefined;
}

export type User = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  fullName?: string | null | undefined;
  userName?: string | null | undefined;
  email?: string | null | undefined;
  hashPassword?: string | null | undefined;
  address?: string | null | undefined;
  dateOfBirth?: string | undefined;
  avatarUrl?: string | null | undefined;
  roleId?: string | undefined;
  role?: Role | undefined;
  favoriteBooks?: FavoriteBook[] | null | undefined;
  comments?: Comment[] | null | undefined;
  likedComments?: Comment[] | null | undefined;
}
