/* eslint-disable */
export type LoginRequest = {
  userName?: string | null | undefined;
  password?: string | null | undefined;
}

export type RegisterRequest = {
  userName?: string | null | undefined;
  email?: string | null | undefined;
  password?: string | null | undefined;
  confirmPassword?: string | null | undefined;
  address?: string | null | undefined;
  dateOfBirth?: string | undefined;
}

export type TokenRequest = {
  userId?: string | undefined;
  refreshToken?: string | null | undefined;
}

export type WeatherForecast = {
  date?: string | undefined;
  temperatureC?: number | undefined;
  temperatureF?: number | undefined;
  summary?: string | null | undefined;
}
