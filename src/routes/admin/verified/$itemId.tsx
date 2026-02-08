import { createFileRoute } from "@tanstack/react-router";
import AdminVerifiedItemPage from "@/pages/admin/verified-item";

export const Route = createFileRoute("/admin/verified/$itemId")({
  component: AdminVerifiedItemPage,
});
