import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ItemCard from "@/features/items/components/ItemCard";
import type { MockItem } from "@/features/items/types";

const mockVerifiedItems: MockItem[] = [
  {
    id: "101",
    type: "FOUND",
    status: "VERIFIED",
    category: "MacBook Charger",
    campus_zone: "Library",
    found_at: "2025-01-20T10:30:00Z",
  },
  {
    id: "102",
    type: "FOUND",
    status: "VERIFIED",
    category: "Blue Umbrella",
    campus_zone: "Main Entrance",
    found_at: "2025-01-22T14:15:00Z",
  },
];

export default function AdminVerifiedPage() {
  return (
    <ModernAdminLayout>
      <div className="p-8">
        <AdminPageHeader
          title="Verified Database"
          description="Verified items ready to be prepared for claims."
          icon={ShieldCheck}
        />

        <div className="space-y-6">
          {mockVerifiedItems.map((item) => (
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

        {mockVerifiedItems.length === 0 && (
          <div className="text-center py-20 text-gray-500 border border-dashed rounded-xl mt-10">
            No verified items found.
          </div>
        )}
      </div>
    </ModernAdminLayout>
  );
}
