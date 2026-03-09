import { createFileRoute } from "@tanstack/react-router";
import AdminLandingPage from "@/pages/admin/landing";

export const Route = createFileRoute("/admin/landing")({
    component: AdminLandingPage,
});
