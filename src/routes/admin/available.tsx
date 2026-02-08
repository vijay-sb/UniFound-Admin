import { createFileRoute } from "@tanstack/react-router";
import AdminAvailablePage from "@/pages/admin/available";

export const Route = createFileRoute("/admin/available")({
  component: AdminAvailablePage,
});
