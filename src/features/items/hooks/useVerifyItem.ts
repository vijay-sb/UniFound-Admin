// src/features/items/hooks/useVerifyItem.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyItem } from "@/api/admin.items.api";

export function useVerifyItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => verifyItem(itemId),

    onSuccess: () => {
      /**
       * We intentionally keep this generic.
       * Once we confirm the list endpoints + query keys,
       * we will invalidate them here.
       */
      queryClient.invalidateQueries({
        queryKey: ["admin-items"],
      });
    },
  });
}
