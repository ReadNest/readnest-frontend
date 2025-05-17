export const RoleEnum = {
  ADMIN: "Admin",
  USER: "User",
} as const;

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum];
