import AdminLayout from "@/components/layout/AdminLayout";

export default function AdminVerifiedPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold">
          Verified Items
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Items that have been physically verified and are now visible
          in the public discovery feed.
        </p>

        <div className="mt-6 border border-dashed p-4 text-sm text-gray-500">
          VERIFIED items list will appear here.
        </div>
      </div>
    </AdminLayout>
  );
}
