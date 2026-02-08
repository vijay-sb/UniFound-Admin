import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { CheckCircle, Lock } from "lucide-react";
import ItemCard from "@/features/items/components/ItemCard";
import { useAdminItems } from "@/features/items/hooks/useAdminItems";

export default function AdminAvailablePage() {
  const { data, isLoading, isError } = useAdminItems();

  const availableItems =
    data?.filter((item) => item.status === "AVAILABLE") ?? [];

  return (
    <ModernAdminLayout>
      <div className="p-8">
        <AdminPageHeader
          title="Available Items"
          description="Items that are published and currently claimable by users."
          icon={CheckCircle}
        />

        {isLoading && <p className="text-gray-500">Loading…</p>}
        {isError && <p className="text-red-500">Failed to load items.</p>}

        <div className="space-y-6">
          {availableItems.map((item) => (
            <div key={item.id} className="space-y-3">
              <ItemCard item={item} />

              <div className="pl-4">
                <button
                  disabled
                  className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded border border-white/10 text-gray-500 cursor-not-allowed"
                  title="Claim flow not enabled yet"
                >
                  <Lock className="w-4 h-4" />
                  Mark as Claimed (Disabled)
                </button>
              </div>
            </div>
          ))}
        </div>

        {!isLoading && availableItems.length === 0 && (
          <div className="text-center py-20 text-gray-500 border border-dashed rounded-xl mt-10">
            No available items at the moment.
          </div>
        )}
      </div>
    </ModernAdminLayout>
  );
}
