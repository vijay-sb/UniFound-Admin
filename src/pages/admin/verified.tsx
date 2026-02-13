import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminSearchBar from "@/features/items/components/AdminSearchBar";
import AdminFilterBar from "@/features/items/components/AdminFilterBar";
import { useItemSearch } from "@/features/items/hooks/useItemSearch";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ItemCard from "@/features/items/components/ItemCard";
import { useAdminItems } from "@/features/items/hooks/useAdminItems";

export default function AdminVerifiedPage() {
  const { data, isLoading, isError } = useAdminItems();

  const verifiedItemsRaw = data?.filter((item) => item.status === "VERIFIED") ?? [];
  const {
    searchQuery,
    setSearchQuery,
    filteredItems,
    filters,
    setFilters,
    availableCategories,
    availableZones,
  } = useItemSearch(verifiedItemsRaw);

  return (
    <ModernAdminLayout>
      <div className="p-8">
        <AdminPageHeader
          title="Verified Database"
          description="Verified items ready to be prepared for claims."
          icon={CheckCircle}
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

        <div className="space-y-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="space-y-3">
              <ItemCard item={item} />

              <div className="pl-4">
                <Link
                  to="/admin/verified/$itemId"
                  params={{ itemId: item.id }}
                  className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded border border-white/10 hover:bg-white/5 text-emerald-400"
                >
                  Prepare for Claims
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500 border border-dashed rounded-xl mt-10">
            No items found matching your search.
          </div>
        )}
      </div>
    </ModernAdminLayout>
  );
}
