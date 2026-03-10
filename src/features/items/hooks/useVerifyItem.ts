// ============================================================================
// USE VERIFY ITEM HOOK
// ============================================================================
// Mutation hook for verifying items (changing status from UNVERIFIED to VERIFIED)
// Automatically invalidates queries after successful verification

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyItem } from "@/api/admin.items.api";

/**
Verifies an unverified item after admin confirms it's legitimate
- Calls verifyItem API with item ID
- Automatically refetches admin items list on success
- Handles loading and error states

@returns React Query mutation with:
- mutate(itemId): Function to verify an item
- isPending: Whether verification is in progress
- isError: Whether verification failed
- error: Error object if failed

@example
const verifyMutation = useVerifyItem()
const handleVerify = () => {
  verifyMutation.mutate(itemId)
}
*/
export function useVerifyItem() {
  const queryClient = useQueryClient();

  return useMutation({
    // Function that performs the verification API call
    mutationFn: (itemId: string) => verifyItem(itemId),

    // On successful verification
    onSuccess: () => {
      /**
Invalidate cached items list so it refetches from server
This ensures UI shows the updated item status
Will be replaced once backend confirms query key structure
*/
      queryClient.invalidateQueries({
        queryKey: ["admin-items"],
      });
    },
  });
}
