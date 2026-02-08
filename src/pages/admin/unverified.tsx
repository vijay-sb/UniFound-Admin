import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { ListTodo } from "lucide-react";
import ItemCard from "@/features/items/components/ItemCard";
import { useAdminItems } from "@/features/items/hooks/useAdminItems";
import { useVerifyItem } from "@/features/items/hooks/useVerifyItem";

export default function AdminUnverifiedPage() {
  const { data, isLoading, isError } = useAdminItems();
  const verifyMutation = useVerifyItem();

  const unverifiedItems =
    data?.filter((item) => item.status === "UNVERIFIED") ?? [];

  return (
    <ModernAdminLayout>
      <div className="p-8">
        <AdminPageHeader
          title="Unverified Items"
          description="Items awaiting physical verification."
          icon={ListTodo}
        />

        {isLoading && <p className="text-gray-500">Loading…</p>}
        {isError && <p className="text-red-500">Failed to load items.</p>}

        <div className="space-y-4">
          {unverifiedItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              showVerifyAction
              onVerify={() => verifyMutation.mutate(item.id)}
            />
          ))}
        </div>

        {!isLoading && unverifiedItems.length === 0 && (
          <div className="text-center py-20 text-gray-500 border border-dashed rounded-xl mt-10">
            No items pending verification.
          </div>
        )}
      </div>
    </ModernAdminLayout>
  );
}
