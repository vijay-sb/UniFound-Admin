import { createFileRoute } from '@tanstack/react-router'
import AdminClaimsPage from '../../pages/admin/claims'

export const Route = createFileRoute('/admin/claims')({
  component: AdminClaimsPage,
})
