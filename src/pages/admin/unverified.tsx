import { useState } from "react";
import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { ListTodo } from "lucide-react";
import ItemCard from "@/features/items/components/ItemCard";
import type { MockItem } from "@/features/items/types";

const initialItems: MockItem[] = [
  {
    id: "1",
    type: "FOUND",
    status: "UNVERIFIED",
    category: "Wallet",
    campus_zone: "Library",
    found_at: "2025-02-01T10:30:00Z",
    image_key: "found-items/1.jpg",
  },
  {
    id: "2",
    type: "FOUND",
    status: "UNVERIFIED",
    category: "Water Bottle",
    campus_zone: "Cafeteria",
    found_at: "2025-02-02T14:15:00Z",
    image_key: "found-items/2.jpg",
  },
];

export default function AdminUnverifiedPage() {
  const [items, setItems] = useState(initialItems);

  const handleVerify = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ModernAdminLayout>
      <div className="p-8">
        <AdminPageHeader
          title="Unverified Items"
          description="Items awaiting physical verification."
          icon={ListTodo}
        />

        <div className="space-y-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              showVerifyAction
              onVerify={() => handleVerify(item.id)}
            />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 text-gray-500 border border-dashed rounded-xl mt-10">
            No items pending verification.
          </div>
        )}
      </div>
    </ModernAdminLayout>
  );
}
