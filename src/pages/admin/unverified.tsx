import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { AlertCircle } from "lucide-react";
import ItemCard from "@/features/items/components/ItemCard";
import { useAdminItems } from "@/features/items/hooks/useAdminItems";
import { useVerifyItem } from "@/features/items/hooks/useVerifyItem";
import AdminGuard from "@/components/AdminGuard";
import AdminSearchBar from "@/features/items/components/AdminSearchBar";
import AdminFilterBar from "@/features/items/components/AdminFilterBar";
import { useItemSearch } from "@/features/items/hooks/useItemSearch";

export default function AdminUnverifiedPage() {
  const { data, isLoading, isError } = useAdminItems();
  const verifyMutation = useVerifyItem();

  const unverifiedItemsRaw = data?.filter((item) => item.status === "UNVERIFIED") ?? [];
  const {
    searchQuery,
    setSearchQuery,
    filteredItems,
    filters,
    setFilters,
    availableCategories,
    availableZones,
  } = useItemSearch(unverifiedItemsRaw);

  return (
    <AdminGuard>
    <ModernAdminLayout>
      <div className="p-8">
        <AdminPageHeader
          title="Unverified Items"
          description="Items awaiting physical verification."
          icon={AlertCircle}
        />

        <div className="mb-6 space-y-4">
          <AdminSearchBar value={searchQuery} onChange={setSearchQuery} />
          <AdminFilterBar
            filters={filters}
            setFilters={setFilters}
            categories={availableCategories}
            zones={availableZones}
          />
        </div>

        {isLoading && <p className="text-gray-500">Loading…</p>}
        {isError && <p className="text-red-500">Failed to load items.</p>}

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              showVerifyAction
              onVerify={() => verifyMutation.mutate(item.id)}
            />
          ))}
        </div>

        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500 border border-dashed rounded-xl mt-10">
            No items found matching your search.
          </div>
        )}
      </div>
    </ModernAdminLayout>
    </AdminGuard>
  );
}
