import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { CheckCircle, Lock } from "lucide-react";
import ItemCard from "@/features/items/components/ItemCard";
import type { MockItem } from "@/features/items/types";

const mockAvailableItems: MockItem[] = [
  {
    id: "201",
    type: "FOUND",
    status: "AVAILABLE",
    category: "Laptop Sleeve",
    campus_zone: "Hostel Block B",
    found_at: "2025-01-15T11:20:00Z",
  },
  {
    id: "202",
    type: "FOUND",
    status: "AVAILABLE",
    category: "Wrist Watch",
    campus_zone: "Auditorium",
    found_at: "2025-01-18T16:40:00Z",
  },
];

export default function AdminAvailablePage() {
  return (
    <ModernAdminLayout>
      <div className="p-8">
        <AdminPageHeader
          title="Available Items"
          description="Items that are published and currently claimable by users."
          icon={CheckCircle}
        />

        <div className="space-y-6">
          {mockAvailableItems.map((item) => (
            <div key={item.id} className="space-y-3">
              <ItemCard item={item} />

              {/* Disabled Claim Action */}
              <div className="pl-4">
                <button
                  disabled
                  className="
                    inline-flex items-center gap-2
                    text-sm px-3 py-1 rounded
                    border border-white/10
                    text-gray-500 cursor-not-allowed
                  "
                  title="Claim flow not enabled yet"
                >
                  <Lock className="w-4 h-4" />
                  Mark as Claimed (Disabled)
                </button>
              </div>
            </div>
          ))}
        </div>

        {mockAvailableItems.length === 0 && (
          <div className="text-center py-20 text-gray-500 border border-dashed rounded-xl mt-10">
            No available items at the moment.
          </div>
        )}
      </div>
    </ModernAdminLayout>
  );
}
