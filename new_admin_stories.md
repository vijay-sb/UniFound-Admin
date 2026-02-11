✅ User Story 1.8: Advanced Admin Item Management Table
User Story
As an admin, I want to efficiently search, filter, and sort through hundreds of found items so that I can quickly manage large volumes of data without pagination issues.

Tasks
🖥️ Admin Panel
·    Niharika
·    Implement `TanStack Table` for advanced data handling (sorting, pagination).
·    Build a "Facet Filter" component to filter by Campus Zone, Category, and Date range simultaneously.
·    Create custom column visibility toggles (allow admins to hide/show columns).
·    Design and implement "Bulk Selection" UI for future batch operations.
🔧 Backend
·    Vijay
·    Ensure API supports pagination, sorting, and filtering parameters.
📱 Flutter
·    ❌ No tasks

✅ User Story 1.9: Admin Dashboard & Analytics
User Story
As an admin, I want to see a high-level statistical overview of lost and found operations upon logging in, so I can track campus safety trends and workload.

Tasks
🖥️ Admin Panel
·    Niharika
·    Design a Dashboard Grid Layout with responsive widgets.
·    Create "Stat Card" components (e.g., "Total Unverified", "Ready to Publish", "Claimed This Week").
·    Implement a "Recent Activity" timeline widget showing the latest 5 actions.
·    Integrate a charting library (e.g., Recharts) to visualize "Items Found per Zone" or "Reports over Time".
🔧 Backend
·    Vijay
·    Create an aggregate stats API endpoint.
📱 Flutter
·    ❌ No tasks

✅ User Story 2.8: Admin "Blind Feed" Preview Mode
User Story
As an admin, before I publish an item, I want to see exactly how it will appear to students in the Blind Feed to ensure no sensitive details are accidentally exposed.

Tasks
🖥️ Admin Panel
·    Niharika
·    Implement a "Preview as Student" toggle in the Item Detail view.
·    Build a reusable "Blind Feed Card" component (shared logic with student view concept) that strictly renders only public fields.
·    Add visual indicators/warnings if the admin view contains data that will be hidden in public view.
🔧 Backend
·    ❌ No tasks (Purely frontend simulation)
📱 Flutter
·    ❌ No tasks
