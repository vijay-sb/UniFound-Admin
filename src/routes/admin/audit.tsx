import { createFileRoute } from '@tanstack/react-router'
import AdminAuditPage from '../../pages/admin/audit'

export const Route = createFileRoute('/admin/audit')({
  component: AdminAuditPage,
})
