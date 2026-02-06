import { createFileRoute } from "@tanstack/react-router";
import AdminUnverifiedPage from "@/pages/admin/unverified";

export const Route = createFileRoute("/admin/unverified")({
  component: AdminUnverifiedPage,
});
