# STRIGLO Supabase Integration Plan

STRIGLO is currently a working mock-first MVP for the Belarus market. The app should stay fast, mobile-first, booking-first, and client-first while Supabase is introduced in small, reversible steps.

This document is a planning artifact only. It does not connect UI screens to Supabase, add RLS policies, or replace mock data.

## Current Integration Boundaries

### Supabase foundation

- SQL schema: `supabase/schema.sql`
- Browser client: `src/shared/lib/supabase/client.ts`
- Database-shaped TypeScript types: `src/shared/types/database.ts`
- Booking data access foundation: `src/features/booking/api/booking-api.ts`

The client helper is browser-only, reads `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and exposes `isSupabaseConfigured()`. The booking API throws a controlled `BookingApiError` when Supabase env vars are missing.

### Active mock data

- Services: `src/entities/service/mock.ts`
- Barbers: `src/entities/barber/mock.ts`
- Slots: `src/entities/slot/mock.ts`
- Booking draft: `src/features/booking/model/booking-draft-store.ts`
- Created mock appointments: `src/entities/booking/appointment-store.ts`
- Activity UI mapping: `src/app/activity/page.tsx`
- STRIGLO GO mock flow: `src/app/go/page.tsx`
- Barber dashboard mocks: `src/features/barber-dashboard/model/mock-barber-dashboard.ts`
- Admin panel local state: `src/features/admin-panel/model/admin-panel-store.ts`
- Admin panel mock seed data: `src/features/admin-panel/model/mock-admin-data.ts`
- Mock auth session: `src/features/auth/model/auth-store.ts`

### Current production routes using mocks

- `/booking` reads `mockServices`, `mockBarbers`, `getMockSlots()`, booking draft store, auth store, and appointment store.
- `/booking/confirm` reads the last mock appointment from appointment store.
- `/activity` displays appointments from appointment store and maps them to activity cards.
- `/go` creates a pending GO appointment in appointment store.
- `/barber` reads local dashboard mock arrays and local UI state for request actions.
- `/admin` reads and mutates local Zustand admin state.

## Schema Readiness

The schema is a good MVP v1 base for:

- `users`
- `barbers`
- `services`
- `barber_services`
- `barber_availability`
- `bookings`
- `go_requests`
- `go_proposals`
- `haircut_recommendations`

Useful constraints already exist:

- role/status/type check constraints
- positive service duration
- non-negative service price
- valid weekday range
- valid time ranges
- duplicate barber-service prevention
- indexes for likely booking, GO request, availability, and relation queries

RLS is intentionally not implemented yet. That is the right choice until Supabase Auth and role mapping are agreed.

## Frontend And Schema Mismatches

### Naming shape

The database uses `snake_case`; UI/domain code uses `camelCase`.

Examples:

- `avatar_url` -> `avatarUrl`
- `duration_minutes` -> `durationMinutes`
- `barber_id` -> `barberId`
- `start_time` -> `startTime`
- `is_go_available` -> `isGoAvailable`
- `created_at` -> `createdAt`

Recommendation: keep UI models camelCase and map rows in the API/repository layer.

### Service model

Database:

- `title`
- `description`
- `duration_minutes`
- `price`
- `is_active`

Frontend:

- `name`
- `durationMinutes`
- `priceByn`

Mismatch:

- UI expects `name`, DB stores `title`.
- UI uses `priceByn` as display-level ruble amount, DB uses `price` integer. The schema comment says price is stored in Belarusian kopecks, while mocks use whole rubles. This must be decided before live create/read usage.

Recommendation:

- For MVP read integration, map `title` to `name`.
- Decide whether DB `price` means kopecks or rubles before production data is entered. If kopecks, API mapper should expose `priceByn = price / 100`.

### Barber model

Database:

- `user_id`
- `avatar_url`
- `bio`
- `is_active`

Frontend:

- `serviceIds`
- `specialization`
- `isActive`

Mismatch:

- `serviceIds` is not a field on `barbers`; it must be composed from `barber_services`.
- `specialization` is UI-only and not represented in schema.
- DB has optional `user_id`, which will matter once real barber auth exists.

Recommendation:

- Add a read mapper that fetches active barbers plus `barber_services` and returns `BarberProfile[]`.
- Treat `specialization` as derived copy from `bio` or omit it until a real profile field is needed.

### Slot model

Database:

- no `slots` table
- availability lives in `barber_availability`
- booked times live in `bookings`

Frontend:

- `Slot`
- `SlotsByDate`
- `maxDurationMinutes`
- optional `barberId`
- `isAvailable`

Mismatch:

- Slots are generated UI artifacts, not database rows.
- `maxDurationMinutes` is mock-only and must be derived from available window length.

Recommendation:

- Do not create a `slots` table for MVP.
- Build a future isolated slot-generation module from availability, bookings, service duration, and barber-service assignments.

### Booking model

Database:

- IDs only: `user_id`, `barber_id`, `service_id`
- `date`, `start_time`, `end_time`
- `status`
- `type`

Mock appointment store:

- denormalized `serviceName`
- denormalized `barberName`
- `clientName`
- `clientPhone`
- `comment`
- `priceByn`
- `durationMinutes`
- `createdAt`

Mismatch:

- Confirmation and activity currently need denormalized display fields.
- DB bookings do not snapshot price/duration/name at booking time.
- DB bookings do not store a salon booking comment.
- Mock status does not include `completed`; DB status does.
- Entity-level `BookingStatus` in `src/entities/booking/types.ts` includes `draft`, which is not a DB status.

Recommendation:

- First Supabase booking read should use joins or mapper-enriched rows.
- Before production bookings, decide whether bookings should snapshot `price`, `duration_minutes`, and display names to preserve historical accuracy.

### GO request model

Database:

- `go_requests`
- `go_proposals`
- statuses: `pending`, `accepted`, `declined`, `proposed_new_time`, `cancelled`

Frontend:

- `/go` currently creates a `MockAppointment` with `type: "go"`.
- `src/entities/go-request/types.ts` only has `draft | sent`.

Mismatch:

- GO requests are not modeled consistently in frontend state.
- Activity displays GO appointments from appointment store, not `go_requests`.

Recommendation:

- Keep GO mocked until bookings read/create are stable.
- Later introduce a dedicated GO repository and frontend type that matches `go_requests`.

### User/auth model

Database:

- `users.id` UUID
- `phone`
- `name`
- `role`

Mock auth:

- localStorage Zustand user
- string id derived from phone
- `role: "client"` by default

Mismatch:

- Mock user IDs are not Supabase UUIDs.
- It is not decided whether `users.id` will reference `auth.users.id`.
- Browser-side role checks are not secure without Supabase Auth and RLS.

Recommendation:

- Do not connect create booking to real users until auth alignment is planned.
- Decide whether `users.id = auth.users.id` before real RLS policies.

### Availability weekday convention

Schema:

- `weekday` is `0-6`, documented as `0 = Sunday`.

Admin mock:

- `weekdayLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]`
- mock availability uses `1`, `2`, `3` for Monday, Tuesday, Wednesday style values.

Mismatch:

- The UI convention reads as `1-7` Monday-first, while schema is `0-6` Sunday-first.

Recommendation:

- Pick one frontend convention before integration.
- Prefer a small mapper: UI weekday `1-7` Monday-first <-> DB weekday `0-6` Sunday-first.

## Existing API Layer Readiness

File: `src/features/booking/api/booking-api.ts`

| Function | Table | Status | Notes |
| --- | --- | --- | --- |
| `getBarbers()` | `barbers` | Exists | Returns active DB rows only. Does not include `serviceIds` from `barber_services`, so it is not directly compatible with current booking UI. |
| `getServices()` | `services` | Exists | Returns DB rows with `title`, `duration_minutes`, `price`. Needs mapper for UI `Service`. |
| `getAvailability()` | `barber_availability` | Exists | Supports optional `barberId`. Needs weekday convention mapping before UI use. |
| `getBookings()` | `bookings` | Exists | Supports user/barber/date/status filters. Returns raw bookings without joined service/barber/user display data. |
| `createBooking()` | `bookings` | Exists | Inserts DB-shaped booking. Not ready for current mock auth IDs without user alignment. |
| `cancelBooking()` | `bookings` | Exists | Updates status to `cancelled`. Needs RLS/user permission later. |

Error handling is consistent through `BookingApiError`. The API layer is safe as a foundation but should not be imported directly into UI components until mappers are added.

## Missing API Functions

Likely needed in later tasks:

- `getCurrentUser()`
- `createOrGetUserByPhone()`
- `getUserBookings()`
- `getBarberBookings()`
- `getServicesForBarbers()` or `getBarberServices()`
- `getGoRequests()`
- `createGoRequest()`
- `updateGoRequestStatus()`
- `createGoProposal()`
- `getAdminBarbers()`
- `createBarber()`
- `createService()`
- `assignServiceToBarber()`
- `createAvailability()`
- `getHaircutRecommendations()`

Do not add all of these at once. Add them when a route is being integrated.

## Recommended Data Mapping Strategy

Use API-layer mappers and keep UI/domain types camelCase.

Example mapping:

```ts
function mapServiceRow(row: DbService): Service {
  return {
    id: row.id,
    name: row.title,
    durationMinutes: row.duration_minutes,
    priceByn: row.price,
  };
}
```

If DB price is confirmed as kopecks, use:

```ts
priceByn: row.price / 100
```

Recommended structure:

- `src/features/booking/api/booking-api.ts` keeps raw low-level table reads/writes.
- `src/features/booking/api/booking-mappers.ts` maps DB rows to UI models.
- `src/features/booking/api/booking-repository.ts` exposes app-ready methods such as `getBookableServices()` and `getBookableBarbers()`.

This keeps pages fast to read and prevents DB naming from leaking into UI components.

## Safe Integration Order

### 1. Services read

Start with active services from Supabase. This is low risk, read-only, and does not require auth.

### 2. Barbers read

Fetch active barbers and barber-service assignments. This is still read-only but needs composition.

### 3. Availability read

Fetch `barber_availability` and keep slot generation isolated. Do not rewrite scheduling rules inside `/booking/page.tsx`.

### 4. Booking creation

Only after user/auth mapping is decided. Until then, mock appointment creation remains safer.

### 5. Activity from Supabase

Use joined/enriched booking data for the authenticated user. Keep mock fallback during transition.

### 6. Barber dashboard read

Needs role mapping and barber/user relation. Keep mocked until auth roles are credible.

### 7. STRIGLO GO requests

Introduce after normal booking create/read is stable. GO has more status/proposal complexity.

### 8. Admin CRUD

Highest blast radius. Requires admin role, RLS, validation, and predictable mutations.

## Loading And Error Behavior Plan

### `/booking`

- Skeleton service cards while loading services.
- Skeleton barber/slot area while loading barbers or availability.
- Inline error with retry for failed read.
- Keep CTA disabled with a reason while required data is missing.
- Use explicit dev/mock fallback only behind a deliberate flag.

### `/activity`

- Timeline skeleton while loading user bookings.
- Empty state for no bookings.
- Inline retry if bookings fail to load.
- Do not mix real Supabase bookings with unlabeled demo data.

### `/barber`

- Dashboard card skeletons for today/upcoming/GO requests.
- Empty states per section.
- Error state should be section-level, not full app crash.

### `/go`

- Load services/barbers using the same read mappers as booking.
- Show inline errors for unavailable service/barber/date/time.
- Keep GO request submission mocked until `go_requests` integration task.

### `/admin`

- Keep local mock state until auth/RLS are ready.
- Once integrated, use section-level loading/error states and avoid enterprise table-heavy UI.

## Auth And RLS Risk Review

Current auth is a local mock session. It verifies OTP code `1111`, stores phone in Zustand persist, and defaults users to `client`.

Risks:

- Mock localStorage auth is not trusted by Supabase.
- `users.id` may need to equal `auth.users.id`, but that decision is not finalized.
- Barber/admin roles cannot be enforced securely from client-only state.
- Browser anon key calls require RLS to be correct before production data is exposed.
- Creating bookings with mock user IDs will fail or create bad data once UUID FKs are enforced.

Future RLS policy areas:

- Public or authenticated users can read active services and active barbers.
- Clients can read their own profile and bookings.
- Clients can create bookings for themselves.
- Clients can read/create their own GO requests.
- Barbers can read bookings and GO requests assigned to them.
- Admins can manage barbers, services, assignments, availability, bookings, and GO requests.

Do not rush RLS. First align Supabase Auth, `users`, roles, and data ownership.

## Integration Test Plan

When integration starts, add tests around the new boundary rather than rewriting all UI tests.

Recommended tests:

- Mapper unit tests for service/barber/booking row mapping.
- API/repository tests with a mocked Supabase client.
- Booking flow e2e remains green with mock mode.
- Read-only services/barbers render from mocked Supabase responses.
- Create booking success and failure states are covered once booking create is connected.
- Tests must not require real Supabase credentials.

## Roadmap

### Task 17 - Supabase Read: Services & Barbers

Goal: Add app-ready read repository for active services and barbers.

Likely files:

- `src/features/booking/api/booking-api.ts`
- `src/features/booking/api/booking-mappers.ts`
- `src/features/booking/api/booking-repository.ts`
- `src/entities/service/types.ts`
- `src/entities/barber/types.ts`
- booking API tests

Risk: Low to medium.

Acceptance summary:

- Active services map to current UI `Service`.
- Active barbers map to current `BarberProfile`.
- `barber_services` produces `serviceIds`.
- Missing env produces controlled error.
- Existing mock booking flow remains usable.

### Task 18 - Supabase Read: Availability + Slot Generation Boundary

Goal: Read availability and define a clean boundary for future slot generation.

Likely files:

- `src/features/booking/api/booking-repository.ts`
- `src/features/booking/lib/*`
- `src/entities/slot/types.ts`
- slot generation tests

Risk: Medium.

Acceptance summary:

- Availability rows can be loaded and mapped.
- Weekday convention is documented and mapped.
- No complex scheduling engine is hidden inside a page component.
- Existing `SlotSelector` remains reusable.

### Task 19 - Supabase Create Booking

Goal: Create a real booking row after the mock flow data is validated.

Likely files:

- `src/features/booking/api/booking-repository.ts`
- `src/app/booking/page.tsx` or extracted booking submit component
- `src/entities/booking/*`
- booking submit tests

Risk: Medium to high because auth/user IDs are involved.

Acceptance summary:

- A valid user ID is available.
- Booking create handles loading/error/double-submit.
- Confirmation receives a durable booking ID.
- Mock fallback remains available until production auth is ready.

### Task 20 - Activity From Supabase

Goal: Load current user's bookings from Supabase.

Likely files:

- `src/app/activity/page.tsx`
- `src/features/activity/api/*`
- `src/features/activity/ui/*`
- `src/entities/booking/*`

Risk: Medium.

Acceptance summary:

- Activity displays enriched user bookings.
- Empty, loading, and error states work.
- No unlabeled demo history is mixed with real data.

### Task 21 - Auth Alignment Plan

Goal: Decide how mock phone auth evolves into Supabase Auth/profile rows.

Likely files:

- docs only first
- later `src/features/auth/*`
- later `src/shared/lib/supabase/*`

Risk: High.

Acceptance summary:

- Decision on `users.id` and `auth.users.id`.
- Role model documented.
- No real SMS provider required yet.

### Task 22 - Barber Dashboard Supabase Read

Goal: Load barber-specific bookings and GO requests.

Likely files:

- `src/app/barber/page.tsx`
- `src/features/barber-dashboard/api/*`
- `src/features/barber-dashboard/model/*`

Risk: Medium to high because barber identity and roles matter.

Acceptance summary:

- Barber can read assigned bookings.
- Section-level loading/error/empty states exist.
- Mock actions are not mistaken for persisted backend actions.

### Task 23 - STRIGLO GO Supabase Requests

Goal: Create and display real GO requests.

Likely files:

- `src/app/go/page.tsx`
- `src/features/go-request/api/*`
- `src/entities/go-request/*`
- `src/app/activity/page.tsx`

Risk: Medium.

Acceptance summary:

- User can create a `go_requests` row.
- Activity can show active GO requests.
- Status values match schema.
- Proposal flow stays mocked until explicitly integrated.

### Task 24 - Admin CRUD Supabase MVP

Goal: Connect admin sections to create/read barbers, services, assignments, and availability.

Likely files:

- `src/app/admin/page.tsx`
- `src/features/admin-panel/api/*`
- `src/features/admin-panel/model/*`
- `src/features/admin-panel/ui/*`

Risk: High.

Acceptance summary:

- Admin role is enforced.
- Create barber/service/assignment/availability work.
- Duplicate assignments and invalid time ranges are blocked.
- UI remains compact and not CRM-heavy.

### Task 25 - RLS Policies MVP

Goal: Add minimal safe RLS policies after auth and role mapping are ready.

Likely files:

- `supabase/migrations/*` or `supabase/schema.sql`
- RLS documentation

Risk: High.

Acceptance summary:

- Clients can only access their own private data.
- Barbers can only access assigned operational data.
- Admins can manage MVP configuration.
- Public reads are limited to active service/barber data.

## Assumptions

- BYN/local ruble context remains the product context.
- User-facing UI may display prices as `45 р.`, while internal/mock names may still use `priceByn`.
- Supabase Auth is not active yet.
- Existing mock flow must stay functional until each integration slice is complete.
- No full backend replacement should happen in one task.

## Non-Goals For This Planning Task

- No UI connected to Supabase.
- No Supabase Auth implementation.
- No RLS policies.
- No admin CRUD backend.
- No barber dashboard backend.
- No GO backend.
- No payment, notifications, maps, live tracking, or CRM scope.
