import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { ListTodo } from "lucide-react";
import ItemCard from "@/features/items/components/ItemCard";
import type { MockItem } from "@/features/items/types";

// MOCK DATA
const mockUnverifiedItems: MockItem[] = [
  {
    id: "1",
    type: "FOUND",
    status: "UNVERIFIED",
    category: "Wallet",
    campus_zone: "Library",
    found_at: "2025-02-01T10:30:00Z",
  },
  {
    id: "2",
    type: "FOUND",
    status: "UNVERIFIED",
    category: "Water Bottle",
    campus_zone: "Cafeteria",
    found_at: "2025-02-02T14:15:00Z",
  },
  {
    id: "3",
    type: "FOUND",
    status: "UNVERIFIED",
    category: "Calculus Textbook",
    campus_zone: "Science Block",
    found_at: "2025-02-03T09:00:00Z",
  },
    {
    id: "4",
    type: "FOUND",
    status: "UNVERIFIED",
    category: "Wireless Earbuds",
    campus_zone: "Gym",
    found_at: "2025-02-03T18:45:00Z",
  },
];

export default function AdminUnverifiedPage() {
  const handleVerify = (id: string) => {
    console.log(`Verifying item ${id}...`);
    alert(`Item ${id} verified (UI Simulation)`);
  };

  return (
    <ModernAdminLayout>
      <div className="p-8">
          <AdminPageHeader
            title="Unverified Items"
            description="Items reported by users that are awaiting physical verification. Once verified, they will be public."
            icon={ListTodo}
          />

          <div className="space-y-4">
            {mockUnverifiedItems.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item} 
                showVerifyAction={true}
                onVerify={() => handleVerify(item.id)}
              />
            ))}
          </div>

          {mockUnverifiedItems.length === 0 && (
             <div className="text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                No items pending verification.
            </div>
          )}
      </div>
    </ModernAdminLayout>
  );
}
