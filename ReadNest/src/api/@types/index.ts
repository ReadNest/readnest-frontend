/* eslint-disable */
export type DetailError = {
  field?: string | null | undefined;
  value?: string | null | undefined;
  messageId?: string | null | undefined;
  message?: string | null | undefined;
}

export type GetUserResponse = {
  userId?: string | undefined;
  userName?: string | null | undefined;
  email?: string | null | undefined;
  address?: string | null | undefined;
  dateOfBirth?: string | undefined;
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

export type WeatherForecast = {
  date?: string | undefined;
  temperatureC?: number | undefined;
  temperatureF?: number | undefined;
  summary?: string | null | undefined;
}
