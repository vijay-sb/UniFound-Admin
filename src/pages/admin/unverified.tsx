export default function AdminUnverifiedPage() {
  return (
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
  );
}
