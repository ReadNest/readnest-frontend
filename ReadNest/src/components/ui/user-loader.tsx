import { type ReactNode } from "react";

type UserLoaderProps = {
  loading: boolean;
  children: ReactNode;
};

export function UserLoader({ loading, children }: UserLoaderProps) {
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
