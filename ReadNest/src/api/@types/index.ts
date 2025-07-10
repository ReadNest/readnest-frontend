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

export type Badge = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  code?: string | null | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  userBadges?: UserBadge[] | null | undefined;
  eventRewards?: EventReward[] | null | undefined;
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
  tradingPosts?: TradingPost[] | null | undefined;
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

export type ChatMessage = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  senderId?: string | undefined;
  sender?: User | undefined;
  receiverId?: string | undefined;
  receiver?: User | undefined;
  message?: string | null | undefined;
  sentAt?: string | undefined;
  isRead?: boolean | undefined;
}

export type ChatMessageCacheModel = {
  id?: string | undefined;
  senderId?: string | undefined;
  receiverId?: string | undefined;
  message: string | null;
  sentAt?: string | undefined;
  isRead?: boolean | undefined;
  isSaved?: boolean | undefined;
}

export type ChatMessageCacheModelListApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: ChatMessageCacheModel[] | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
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

export type CreateBadgeRequest = {
  code?: string | null | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export type CreateBadgeResponse = {
  code?: string | null | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export type CreateBadgeResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: CreateBadgeResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
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

export type CreateEventRequest = {
  name?: string | null | undefined;
  description?: string | null | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  type?: string | null | undefined;
  status?: string | null | undefined;
}

export type CreateFeatureRequest = {
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export type CreatePackageFeatureRequest = {
  featureId?: string | undefined;
}

export type CreatePackageRequest = {
  name?: string | null | undefined;
  price?: number | undefined;
  durationMonths?: number | undefined;
  features?: string | null | undefined;
  packageFeatures?: CreatePackageFeatureRequest[] | null | undefined;
}

export type CreatePaymentLinkRequest = {
  packageId?: string | undefined;
  userId?: string | undefined;
}

export type CreatePostRequest = {
  title?: string | null | undefined;
  content?: string | null | undefined;
  bookId?: string | undefined;
  userId?: string | undefined;
}

export type CreateTradingPostImageRequest = {
  imageUrl?: string | null | undefined;
  order?: number | undefined;
}

export type CreateTradingPostRequest = {
  userId?: string | undefined;
  bookId?: string | undefined;
  condition?: string | null | undefined;
  shortDescription?: string | null | undefined;
  externalBookUrl?: string | null | undefined;
  message?: string | null | undefined;
  messageToRequester?: string | null | undefined;
  images?: CreateTradingPostImageRequest[] | null | undefined;
  title?: string | null | undefined;
}

export type CreateTradingPostRequestV2 = {
  userId?: string | undefined;
  externalBookUrl?: string | null | undefined;
  message?: string | null | undefined;
}

export type CreateTradingRequest = {
  userId?: string | undefined;
  tradingPostId?: string | undefined;
}

export type DetailError = {
  field?: string | null | undefined;
  value?: string | null | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
}

export type Event = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  type?: string | null | undefined;
  status?: string | null | undefined;
  leaderboards?: Leaderboard[] | null | undefined;
  rewards?: EventReward[] | null | undefined;
}

export type EventResponse = {
  id?: string | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  type?: string | null | undefined;
  status?: string | null | undefined;
}

export type EventResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: EventResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type EventResponseIEnumerableApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: EventResponse[] | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type EventResponsePagingResponse = {
  items?: EventResponse[] | null | undefined;
  totalItems?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
}

export type EventResponsePagingResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: EventResponsePagingResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type EventReward = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  conditionType?: string | null | undefined;
  threshold?: number | undefined;
  badgeId?: string | undefined;
  eventId?: string | undefined;
  badge?: Badge | undefined;
  event?: Event | undefined;
}

export type EventRewardResponse = {
  id?: string | undefined;
  conditionType?: string | null | undefined;
  threshold?: number | undefined;
  badgeId?: string | undefined;
  eventId?: string | undefined;
  badge?: GetBadgeResponse | undefined;
}

export type EventRewardResponseIEnumerableApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: EventRewardResponse[] | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
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

export type Feature = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  packageFeatures?: PackageFeature[] | null | undefined;
}

export type FilterPostRequest = {
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
  keyword?: string | null | undefined;
  bookId?: string | null | undefined;
  sortBy?: string | null | undefined;
}

export type GetAffiliateLinkResponse = {
  id?: string | undefined;
  partnerName?: string | null | undefined;
  affiliateLink?: string | null | undefined;
}

export type GetBadgeResponse = {
  id?: string | undefined;
  code?: string | null | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export type GetBadgeResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetBadgeResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
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

export type GetBookTradingPostResponse = {
  id?: string | undefined;
  title?: string | null | undefined;
  author?: string | null | undefined;
  imageUrl?: string | null | undefined;
  condition?: string | null | undefined;
  tradingRequestIds?: string[] | null | undefined;
}

export type GetBookTradingPostResponseListApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetBookTradingPostResponse[] | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetBookTradingPostResponsePagingResponse = {
  items?: GetBookTradingPostResponse[] | null | undefined;
  totalItems?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
}

export type GetBookTradingPostResponsePagingResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetBookTradingPostResponsePagingResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetBookTradingPostV2Response = {
  id?: string | undefined;
  title?: string | null | undefined;
  author?: string | null | undefined;
  ownerName?: string | null | undefined;
  userName?: string | null | undefined;
  imageUrl?: string | null | undefined;
  condition?: string | null | undefined;
  shortDesc?: string | null | undefined;
  messageToRequester?: string | null | undefined;
  numberOfTradingRequests?: number | undefined;
  images?: GetTradingPostImageResponse[] | null | undefined;
}

export type GetBookTradingPostV2ResponseListApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetBookTradingPostV2Response[] | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetBookTradingPostV2ResponsePagingResponse = {
  items?: GetBookTradingPostV2Response[] | null | undefined;
  totalItems?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
}

export type GetBookTradingPostV2ResponsePagingResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetBookTradingPostV2ResponsePagingResponse | undefined;
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

export type GetFeatureResponse = {
  id?: string | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export type GetFeatureResponseListApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetFeatureResponse[] | null | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetFeatureResponsePagingResponse = {
  items?: GetFeatureResponse[] | null | undefined;
  totalItems?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
}

export type GetFeatureResponsePagingResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetFeatureResponsePagingResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetPackageResponse = {
  id?: string | undefined;
  name?: string | null | undefined;
  price?: number | undefined;
  durationMonths?: number | undefined;
  features?: string | null | undefined;
  featureNames?: string[] | null | undefined;
}

export type GetPackageResponsePagingResponse = {
  items?: GetPackageResponse[] | null | undefined;
  totalItems?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
}

export type GetPackageResponsePagingResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetPackageResponsePagingResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetPaymentLinkResponse = {
  checkoutUrl?: string | null | undefined;
}

export type GetPaymentLinkResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetPaymentLinkResponse | undefined;
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

export type GetPostResponsePagingResponse = {
  items?: GetPostResponse[] | null | undefined;
  totalItems?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
}

export type GetPostResponsePagingResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetPostResponsePagingResponse | undefined;
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

export type GetTradingPostImageResponse = {
  id?: string | undefined;
  imageUrl?: string | null | undefined;
  order?: number | undefined;
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
  ownedBadges?: UserBadgeResponse[] | null | undefined;
}

export type GetUserProfileResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetUserProfileResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type GetUserRequestResponse = {
  userId?: string | undefined;
  tradingRequestId?: string | undefined;
  fullName?: string | null | undefined;
  userName?: string | null | undefined;
  avatarUrl?: string | null | undefined;
  status?: string | null | undefined;
}

export type GetUserRequestResponseListApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: GetUserRequestResponse[] | null | undefined;
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
  selectedBadgeCode?: string | null | undefined;
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

export type Leaderboard = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  totalPosts?: number | undefined;
  totalLikes?: number | undefined;
  totalViews?: number | undefined;
  score?: number | undefined;
  rank?: number | undefined;
  userId?: string | undefined;
  user?: User | undefined;
  eventId?: string | undefined;
  event?: Event | undefined;
}

export type LeaderboardRankResponse = {
  userId?: string | undefined;
  rank?: number | undefined;
}

export type LeaderboardRankResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: LeaderboardRankResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type LeaderboardResponse = {
  userId?: string | undefined;
  user?: GetUserResponse | undefined;
  totalPosts?: number | undefined;
  totalLikes?: number | undefined;
  totalViews?: number | undefined;
  score?: number | undefined;
  rank?: number | undefined;
}

export type LeaderboardResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: LeaderboardResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
}

export type LeaderboardResponseIEnumerableApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: LeaderboardResponse[] | null | undefined;
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

export type Package = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  name?: string | null | undefined;
  price?: number | undefined;
  durationMonths?: number | undefined;
  features?: string | null | undefined;
  userSubscriptions?: UserSubscription[] | null | undefined;
  packageFeatures?: PackageFeature[] | null | undefined;
  transactions?: Transaction[] | null | undefined;
}

export type PackageFeature = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  packageId?: string | undefined;
  featureId?: string | undefined;
  package?: Package | undefined;
  feature?: Feature | undefined;
}

export type Post = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  title?: string | null | undefined;
  titleNormalized?: string | null | undefined;
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

export type RecentChatterResponse = {
  userId?: string | undefined;
  userName?: string | null | undefined;
  fullName?: string | null | undefined;
  avatarUrl?: string | null | undefined;
  lastMessageTime?: string | undefined;
  unreadMessagesCount?: number | undefined;
  lastMessage?: string | null | undefined;
}

export type RecentChatterResponseApiResponse = {
  success?: boolean | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
  data?: RecentChatterResponse | undefined;
  listDetailError?: DetailError[] | null | undefined;
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

export type TradingPost = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  ownerId?: string | undefined;
  owner?: User | undefined;
  offeredBookId?: string | undefined;
  offeredBook?: Book | undefined;
  title?: string | null | undefined;
  status?: string | null | undefined;
  condition?: string | null | undefined;
  shortDesc?: string | null | undefined;
  externalBookUrl?: string | null | undefined;
  message?: string | null | undefined;
  messageToRequester?: string | null | undefined;
  tradingRequests?: TradingRequest[] | null | undefined;
  images?: TradingPostImage[] | null | undefined;
}

export type TradingPostImage = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  tradingPostId?: string | undefined;
  imageUrl?: string | null | undefined;
  order?: number | undefined;
  tradingPost?: TradingPost | undefined;
}

export type TradingRequest = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  tradingPostId?: string | undefined;
  tradingPost?: TradingPost | undefined;
  requesterId?: string | undefined;
  requester?: User | undefined;
  status?: string | null | undefined;
}

export type Transaction = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  userId?: string | undefined;
  packageId?: string | undefined;
  orderCode?: number | undefined;
  amount?: number | undefined;
  paymentMethod?: string | null | undefined;
  transactionStatus?: string | null | undefined;
  user?: User | undefined;
  package?: Package | undefined;
}

export type UpdateBadgeRequest = {
  code?: string | null | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export type UpdateBookImageRequest = {
  bookImageId?: string | null | undefined;
  imageUrl?: string | null | undefined;
  order?: number | undefined;
}

export type UpdateBookRequest = {
  title?: string | null | undefined;
  author?: string | null | undefined;
  imageUrl?: string | null | undefined;
  description?: string | null | undefined;
  rating?: number | undefined;
  isbn?: string | null | undefined;
  language?: string | null | undefined;
  categoryIds?: string[] | null | undefined;
  bookImages?: UpdateBookImageRequest[] | null | undefined;
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

export type UpdateEventRequest = {
  id?: string | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  type?: string | null | undefined;
  status?: string | null | undefined;
}

export type UpdatePostRequest = {
  id?: string | undefined;
  title?: string | null | undefined;
  content?: string | null | undefined;
  bookId?: string | undefined;
  userId?: string | undefined;
}

export type UpdateStatusTradingRequest = {
  status?: string | null | undefined;
}

export type UpdateTradingPostImageRequest = {
  id?: string | undefined;
  imageUrl?: string | null | undefined;
  order?: number | undefined;
}

export type UpdateTradingPostRequest = {
  title?: string | null | undefined;
  condition?: string | null | undefined;
  shortDescription?: string | null | undefined;
  messageToRequester?: string | null | undefined;
  images?: UpdateTradingPostImageRequest[] | null | undefined;
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
  userBadges?: UserBadge[] | null | undefined;
  sentMessages?: ChatMessage[] | null | undefined;
  receivedMessages?: ChatMessage[] | null | undefined;
  tradingPosts?: TradingPost[] | null | undefined;
  tradingRequests?: TradingRequest[] | null | undefined;
  leaderboards?: Leaderboard[] | null | undefined;
  userSubscriptions?: UserSubscription[] | null | undefined;
  transactions?: Transaction[] | null | undefined;
}

export type UserBadge = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  userId?: string | undefined;
  user?: User | undefined;
  badgeId?: string | undefined;
  badge?: Badge | undefined;
  isSelected?: boolean | undefined;
}

export type UserBadgeResponse = {
  userBadgeId?: string | undefined;
  userId?: string | undefined;
  badgeId?: string | undefined;
  badgeCode?: string | null | undefined;
  badgeName?: string | null | undefined;
  badgeDescription?: string | null | undefined;
  isSelected?: boolean | undefined;
}

export type UserSubscription = {
  id?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  isDeleted?: boolean | undefined;
  userId?: string | undefined;
  packageId?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | null | undefined;
  status?: string | null | undefined;
  user?: User | undefined;
  package?: Package | undefined;
}

export type WebhookData = {
  orderCode?: number | undefined;
  amount?: number | undefined;
  description?: string | null | undefined;
  accountNumber?: string | null | undefined;
  reference?: string | null | undefined;
  transactionDateTime?: string | null | undefined;
  currency?: string | null | undefined;
  paymentLinkId?: string | null | undefined;
  code?: string | null | undefined;
  desc?: string | null | undefined;
  counterAccountBankId?: string | null | undefined;
  counterAccountBankName?: string | null | undefined;
  counterAccountName?: string | null | undefined;
  counterAccountNumber?: string | null | undefined;
  virtualAccountName?: string | null | undefined;
  virtualAccountNumber?: string | null | undefined;
}

export type WebhookType = {
  code?: string | null | undefined;
  desc?: string | null | undefined;
  success?: boolean | undefined;
  data?: WebhookData | undefined;
  signature?: string | null | undefined;
}
