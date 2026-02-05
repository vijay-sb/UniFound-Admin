import { createFileRoute } from "@tanstack/react-router";
import AdminVerifiedPage from "@/pages/admin/verified";

export const Route = createFileRoute("/admin/verified")({
  component: AdminVerifiedPage,
});
