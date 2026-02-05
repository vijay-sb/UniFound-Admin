import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { isAuthenticated } from "@/lib/auth";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
}
