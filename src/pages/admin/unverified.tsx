import AdminLayout from "@/components/layout/AdminLayout";
// import AdminGuard from "@/components/AdminGuard";

export default function AdminUnverifiedPage() {
  return (
    // <AdminGuard> // dont delte this, we will add auth later
      <AdminLayout>
        <div className="p-6">
          <h1 className="text-xl font-semibold">
            Unverified Found Items
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Items reported by users that are awaiting physical verification.
          </p>

          <div className="mt-6 border border-dashed p-4 text-sm text-gray-500">
            UNVERIFIED items list will appear here.
          </div>
        </div>
      </AdminLayout>
    // </AdminGuard>
  );
}
