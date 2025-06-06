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

export type AffiliateLinkRequest = {
  partnerName?: string | null | undefined;
  affiliateLink?: string | null | undefined;
}

export type Book = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  title?: string | null | undefined;
  titleNormalized?: string | null | undefined;
  author?: string | null | undefined;
  authorNormalized?: string | null | undefined;
  imageUrl?: string | null | undefined;
  avarageRating?: number | undefined;
  description?: string | null | undefined;
  descriptionNormalized?: string | null | undefined;
  isbn?: string | null | undefined;
  language?: string | null | undefined;
  favoriteBooks?: FavoriteBook[] | null | undefined;
  categories?: Category[] | null | undefined;
  affiliateLinks?: AffiliateLink[] | null | undefined;
  comments?: Comment[] | null | undefined;
  bookImages?: BookImage[] | null | undefined;
  posts?: Post[] | null | undefined;
}

export type BookImage = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  bookId?: string | undefined;
  imageUrl?: string | null | undefined;
  order?: number | undefined;
  book?: Book | undefined;
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
  status?: string | null | undefined;
  book?: Book | undefined;
  creator?: User | undefined;
  likes?: User[] | null | undefined;
  reports?: CommentReport[] | null | undefined;
}

export type CommentReport = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  reporterId?: string | undefined;
  commentId?: string | undefined;
  reason?: string | null | undefined;
  status?: string | null | undefined;
  comment?: Comment | undefined;
  reporter?: User | undefined;
}

export type CommentReportReponse = {
  commentReportId?: string | undefined;
  commentId?: string | undefined;
  reporter?: GetUserResponse | undefined;
  reason?: string | null | undefined;
  createdAt?: string | undefined;
}

export type CreateAffiliateLinkRequest = {
  affiliateLinkRequests?: AffiliateLinkRequest[] | null | undefined;
}

export type CreateBookImageRequest = {
  imageUrl?: string | null | undefined;
  order?: number | undefined;
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
  bookImages?: CreateBookImageRequest[] | null | undefined;
}

export type CreateCategoryRequest = {
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export type CreateCommentLikeRequest = {
  userId?: string | undefined;
  commentId?: string | undefined;
}

export type CreateCommentReportRequest = {
  commentId?: string | undefined;
  reporterId?: string | undefined;
  reason?: string | null | undefined;
}

export type CreateCommentRequest = {
  content?: string | null | undefined;
  bookId?: string | undefined;
  userId?: string | undefined;
}

export type CreatePostRequest = {
  title?: string | null | undefined;
  content?: string | null | undefined;
  bookId?: string | undefined;
  userId?: string | undefined;
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

export type GetAffiliateLinkResponse = {
  id?: string | undefined;
  partnerName?: string | null | undefined;
  affiliateLink?: string | null | undefined;
}

export type GetBookImageResponse = {
  id?: string | undefined;
  imageUrl?: string | null | undefined;
  order?: number | undefined;
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
  bookImages?: GetBookImageResponse[] | null | undefined;
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

export type GetBookSearchResponse = {
  id?: string | undefined;
  title?: string | null | undefined;
  author?: string | null | undefined;
  imageUrl?: string | null | undefined;
  averageRating?: number | undefined;
  shortDescription?: string | null | undefined;
  isFavorite?: boolean | undefined;
}

export type GetBookSearchResponsePagingResponse = {
  items?: GetBookSearchResponse[] | null | undefined;
  totalItems?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
}

export type GetBookSearchResponsePagingResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetBookSearchResponsePagingResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetCategoryResponse = {
  id?: string | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export type GetCategoryResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetCategoryResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetCategoryResponseListApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetCategoryResponse[] | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetCategoryResponsePagingResponse = {
  items?: GetCategoryResponse[] | null | undefined;
  totalItems?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
}

export type GetCategoryResponsePagingResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetCategoryResponsePagingResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetCommentResponse = {
  commentId?: string | undefined;
  content?: string | null | undefined;
  bookId?: string | undefined;
  userId?: string | undefined;
  book?: GetBookResponse | undefined;
  creator?: GetUserResponse | undefined;
  creatorName?: string | null | undefined;
  userLikes?: string[] | null | undefined;
  numberOfLikes?: number | undefined;
  createdAt?: string | undefined;
}

export type GetCommentResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetCommentResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetCommentResponseListApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetCommentResponse[] | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetPostResponse = {
  id?: string | undefined;
  title?: string | null | undefined;
  content?: string | null | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  bookId?: string | undefined;
  userId?: string | undefined;
  book?: Book | undefined;
  creator?: GetUserResponse | undefined;
  views?: number | undefined;
  likesCount?: number | undefined;
  userLikes?: string[] | null | undefined;
}

export type GetPostResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetPostResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetPostResponseListApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetPostResponse[] | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetReportedCommentsResponse = {
  commentId?: string | undefined;
  content?: string | null | undefined;
  commenter?: GetUserResponse | undefined;
  reports?: CommentReportReponse[] | null | undefined;
}

export type GetReportedCommentsResponseListApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetReportedCommentsResponse[] | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetUserProfileResponse = {
  userId?: string | undefined;
  fullName?: string | null | undefined;
  userName?: string | null | undefined;
  email?: string | null | undefined;
  address?: string | null | undefined;
  bio?: string | null | undefined;
  dateOfBirth?: string | undefined;
  avatarUrl?: string | null | undefined;
  roleId?: string | undefined;
  roleName?: string | null | undefined;
  comments?: GetCommentResponse[] | null | undefined;
  posts?: GetPostResponse[] | null | undefined;
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

export type LikePostRequest = {
  userId?: string | undefined;
  postId?: string | undefined;
}

export type LoginRequest = {
  userName?: string | null | undefined;
  password?: string | null | undefined;
}

export type Post = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  title?: string | null | undefined;
  content?: string | null | undefined;
  bookId?: string | undefined;
  userId?: string | undefined;
  views?: number | undefined;
  book?: Book | undefined;
  creator?: User | undefined;
  likes?: User[] | null | undefined;
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

export type ToggleFavoriteBookRequest = {
  userId?: string | undefined;
  bookId?: string | undefined;
}

export type ToggleFavoriteBookResponse = {
  bookId?: string | undefined;
  isFavorited?: boolean | undefined;
}

export type ToggleFavoriteBookResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: ToggleFavoriteBookResponse | undefined;
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

export type UpdateCategoryRequest = {
  id?: string | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export type UpdateCommentRequest = {
  commentId?: string | undefined;
  content?: string | null | undefined;
}

export type UpdateUserRequest = {
  userId?: string | undefined;
  fullName?: string | null | undefined;
  address?: string | null | undefined;
  dateOfBirth?: string | null | undefined;
  avatarUrl?: string | null | undefined;
  bio?: string | null | undefined;
}

export type User = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  fullName?: string | null | undefined;
  userName?: string | null | undefined;
  bio?: string | null | undefined;
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
  reports?: CommentReport[] | null | undefined;
  posts?: Post[] | null | undefined;
  likedPosts?: Post[] | null | undefined;
}
