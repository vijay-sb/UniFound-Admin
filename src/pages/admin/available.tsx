import { useState } from "react";
import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { CheckCircle, ScanLine } from "lucide-react";
import ItemCard from "@/features/items/components/ItemCard";
import { useAdminItems } from "@/features/items/hooks/useAdminItems";
import AdminGuard from "@/components/AdminGuard";
import AdminSearchBar from "@/features/items/components/AdminSearchBar";
import AdminFilterBar from "@/features/items/components/AdminFilterBar";
import { useItemSearch } from "@/features/items/hooks/useItemSearch";
import QrScannerModal from "@/features/items/components/QrScannerModal";

export default function AdminAvailablePage() {
  const { data, isLoading, isError, refetch } = useAdminItems();
  const [showQrScanner, setShowQrScanner] = useState(false);

  const availableItemsRaw = data?.filter((item) => item.status === "AVAILABLE") ?? [];

  const {
    searchQuery,
    setSearchQuery,
    filteredItems,
    filters,
    setFilters,
    availableCategories,
    availableZones,
  } = useItemSearch(availableItemsRaw);

  return (
    <AdminGuard>
      <ModernAdminLayout>
        <div className="p-8">
          <AdminPageHeader
            title="Available Items"
            description="Items that are published and currently claimable by users."
            icon={CheckCircle}
          />

          {/* Scan QR Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowQrScanner(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors text-sm font-medium"
            >
              <ScanLine className="w-4 h-4" />
              Scan QR Code for Handover
            </button>
          </div>

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
              </div>
            ))}
          </div>

          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-20 text-gray-500 border border-dashed rounded-xl mt-10">
              No items found matching your search.
            </div>
          )}
        </div>

        {/* QR Scanner Modal */}
        <QrScannerModal
          isOpen={showQrScanner}
          onClose={() => setShowQrScanner(false)}
          onHandoverComplete={() => {
            refetch();
          }}
        />
      </ModernAdminLayout>
    </AdminGuard>
  );
}
