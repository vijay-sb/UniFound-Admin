import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { ShieldCheck } from "lucide-react";
import ItemCard from "@/features/items/components/ItemCard";
import type { MockItem } from "@/features/items/types";

// MOCK DATA
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
   {
    id: "103",
    type: "FOUND",
    status: "VERIFIED",
    category: "Student ID Card",
    campus_zone: "Admin Block",
    found_at: "2025-01-25T09:00:00Z",
  },
];

export default function AdminVerifiedPage() {
  return (
    <ModernAdminLayout>
      <div className="p-8">
          <AdminPageHeader
            title="Verified Database"
            description="Items that have been physically verified and are currently visible in the public discovery feed."
            icon={ShieldCheck}
          />

          <div className="space-y-4">
            {mockVerifiedItems.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item} 
                showVerifyAction={false} 
              />
            ))}
          </div>

           {mockVerifiedItems.length === 0 && (
             <div className="text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                No verified items found.
            </div>
          )}
      </div>
    </ModernAdminLayout>
  );
}
