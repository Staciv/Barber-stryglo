# PROJECT_CONTEXT.md

## Quick source of truth

STRIGLO is a mobile-first barber booking app for Belarus.

Current source of truth:

- Market: Belarus
- Main language: Russian
- User-facing currency display: `50 р.`
- Default phone prefix: `+375`
- Product type: mobile-first booking app, not a landing page
- Main flows: regular booking, STRIGLO GO, user bookings, barber dashboard, simple admin
- STRIGLO GO: premium outcall haircut flow with red premium accent
- MVP excludes: real payments, real AI, real voice NLP, full CRM, push notifications, live tracking and full map
- If old code, old prompts, old tests, old comments or old chat messages conflict with this file, this file wins

---

# 1. Project name

**STRIGLO**

Additional product direction:

**STRIGLO GO** — premium outcall barber booking flow / выездная стрижка.

---

# 2. Product summary

STRIGLO is a mobile-first barber booking application for fast and modern haircut booking.

The product must feel like a modern mobile app, not like a generic barbershop website or old booking CRM.

Core product idea:

- fast booking;
- clean mobile UX;
- strong visual identity;
- minimal friction;
- premium dark barber-tech style;
- STRIGLO GO as a visible premium outcall haircut feature.

The project is currently focused on Belarus.

---

# 3. Main idea

STRIGLO helps users book a haircut as fast as possible with a modern app-like experience.

Instead of a classic booking form, the user should immediately see available options and move through a fast visual flow.

The main experience:

1. User opens the app.
2. User sees two main actions:
   - `Записаться`
   - `Выездная стрижка`
3. User selects a free slot.
4. User confirms service and personal details.
5. Booking is created with minimal typing.

STRIGLO should be perceived as:

- modern;
- fast;
- convenient;
- visually memorable;
- more advanced than typical booking systems like DIKIDI.

---

# 4. Current product direction

Current direction:

- Belarus market.
- Russian interface.
- Belarusian rubles as currency.
- Mobile-first application.
- Booking-first product.
- Modern dark barber-tech UI.
- STRIGLO GO is a premium but important feature.
- SMS login / mock login is the preferred auth model.
- Real payments, real AI, real voice NLP and complex CRM are not part of MVP.

Important:

Older Polish direction is deprecated. If old code, old prompts, old tests or old comments mention Poland, PLN, zł, Polish phone format or Polish localization, this must be treated as legacy unless this file explicitly says otherwise.

---

# 5. Target market and localization

## Main market

Belarus.

## Main language

Russian.

## Currency

Belarusian rubles.

In user-facing UI, prefer local display format like:

```text
50 р.
70 р.
100 р.
```

Do not use `BYN`, `PLN` or `zł` as the default visible price format in the main booking UI.

Important distinction:

- `BYN` is the official currency code and may exist internally if needed.
- In the user-facing booking UI, the preferred visible format is `50 р.`.

## Phone localization

Do not use Polish phone format `+48` as the main format.

For Belarus, the expected default phone prefix is:

```text
+375
```

The app may visually lock or prefill `+375`, while the user enters the rest of the phone number.

---

# 6. Product goal

## Primary goal

Maximize booking conversion.

The app must help the user book a haircut quickly, with minimum friction.

## Secondary goals

- Create a wow-effect.
- Make STRIGLO feel more modern than typical booking systems.
- Make the interface feel like a native mobile app.
- Create a scalable foundation for:
  - client app;
  - barber dashboard;
  - admin panel;
  - STRIGLO GO;
  - future AI / voice features.

---

# 7. Target audience

## Primary direct users

Approximately 16–40 years old.

Core audience:

- younger users;
- people who want quick and simple booking;
- users who do not want to deal with complicated forms.

## Children as clients

Children may be clients of the barber service, but bookings for children are usually made by parents or adults.

## Market context

Small city / local market context.

Users may be familiar with booking tools like DIKIDI.

## User priorities

Users care about:

- speed;
- simplicity;
- affordable price;
- clear available times;
- no unnecessary registration;
- no complicated forms;
- modern visual feeling.

---

# 8. MVP scope

MVP should include:

## Client app

- Main screen with two primary actions:
  - `Записаться`
  - `Выездная стрижка`
- Fast regular booking flow.
- STRIGLO GO flow.
- SMS login / mock login.
- User phone autofill in booking flow after login.
- Ability to manually change phone number in booking flow.
- User activity / bookings area.
- Booking success screen.
- Mock haircut recommendation.
- Mock voice booking logic.
- Skeleton loaders.
- Smooth mobile-first transitions.

## Regular booking

- Show only free available slots.
- Show nearest 3–4 days with free slots immediately after pressing `Записаться`.
- Do not show booked slots to the client.
- Use sticky bottom action after slot selection.
- Dynamic barber selection:
  - if one barber exists, do not force barber choice;
  - if multiple barbers exist, allow selection;
  - `Любой барбер` / `Любой быстрее` may be used when multiple barbers are available.

## STRIGLO GO

- Visible separate entry from main screen.
- Premium outcall haircut flow.
- Planned outcall slots.
- “Suggest your own time” / individual request flow.
- Individual outcall request requires barber confirmation.
- Individual outcall outside schedule must be clearly presented as more expensive.

## Barber dashboard

MVP should have at least basic dashboard concepts:

- today’s bookings;
- upcoming bookings;
- outcall requests;
- request actions:
  - confirm;
  - decline;
  - suggest another time;
  - edit request if needed.

## Admin basics

Minimal admin concept:

- add/edit barbers;
- manage availability;
- manage services;
- manage STRIGLO GO availability;
- view bookings.

---

# 9. Out of scope

The following are not part of MVP:

- real payments;
- real AI haircut generation;
- real AI face analysis;
- real voice NLP;
- full CRM;
- push notifications;
- live tracking;
- full map system;
- complex analytics;
- complex payroll/accounting;
- full chat/messenger;
- advanced loyalty system;
- production-grade dispatch system;
- multi-branch enterprise system.

Mocked or simplified versions are acceptable for MVP.

---

# 10. User roles

## Client

The client can:

- log in via phone number / SMS code;
- book a regular haircut;
- request STRIGLO GO outcall haircut;
- view active bookings;
- view past visits;
- accept or decline barber proposals;
- change phone number manually in booking form if needed.

## Barber

The barber can:

- see own bookings;
- see today’s schedule;
- see client name and phone number for bookings;
- see service type;
- see whether booking is in-salon or outcall;
- see outcall address when relevant;
- confirm outcall requests;
- decline outcall requests;
- suggest another time;
- edit request details if necessary;
- manage own STRIGLO GO availability if allowed.

## Admin

The admin can:

- add barbers;
- edit barber data;
- manage schedules;
- manage services and prices;
- manage STRIGLO GO settings;
- view all bookings;
- control basic product configuration.

---

# 11. Main user flows

## 11.1 Regular booking flow

1. User opens STRIGLO.
2. User sees main screen.
3. User taps `Записаться`.
4. App shows nearest 3–4 days with only free available slots.
5. User selects time.
6. Sticky bottom action appears:
   - example: `Продолжить — 15:00`
7. Barber logic:
   - if only one barber exists, barber is selected automatically;
   - if multiple barbers exist, user can choose a barber or select `Любой быстрее`.
8. User selects service on the final screen:
   - `Стрижка`
   - `Стрижка + борода`
   - `Борода`
9. Name and phone are shown.
10. Phone can be autofilled from account.
11. User can change phone manually.
12. User confirms booking.
13. App shows success screen.

---

## 11.2 STRIGLO GO flow

1. User opens main screen.
2. User taps `Выездная стрижка` / STRIGLO GO.
3. App shows available planned outcall slots.
4. User selects available outcall slot.

If none of the available slots fit:

5. User taps something like:
   - `Предложить своё время`
   - `Нет подходящего времени`
6. App explains that individual outcall outside the planned schedule:
   - costs more;
   - requires barber confirmation.
7. User enters:
   - desired date;
   - desired time;
   - address;
   - service;
   - optional comment.
8. Request is sent to barber.
9. Barber can:
   - confirm;
   - decline;
   - suggest another time;
   - edit request if necessary.
10. Client sees status:
   - initially simple status like `Ожидает подтверждения`.

---

## 11.3 Barber proposal flow

No full chat in MVP.

Use structured communication instead.

Example:

1. Client requests STRIGLO GO for Friday 20:00.
2. Barber cannot accept this time.
3. Barber suggests:
   - Friday 21:00
   - Saturday 12:00
4. Client chooses one option or declines.
5. Booking status updates.

This should not become a full messenger.

---

## 11.4 SMS login flow

1. User enters phone number.
2. App sends SMS code or mock SMS code.
3. User enters code.
4. User is logged in.
5. App goes to main screen.

No email.  
No password.  
No classic registration form.

---

## 11.5 User activity flow

User can see:

- next booking;
- active STRIGLO GO request;
- past visits;
- repeat booking action.

Preferred style:

- modern timeline / activity cards;
- not a boring table;
- not a complex dashboard.

---

## 11.6 Haircut recommendation flow

MVP version:

1. User opens haircut recommendation.
2. User uploads photo or uses mock upload.
3. App shows mocked recommended hairstyles.
4. User selects a style.
5. User can continue to booking.

This is a mocked UX feature in MVP, not real AI.

---

## 11.7 Voice booking flow

MVP version:

1. User taps voice button.
2. App simulates voice parsing.
3. Example phrase:
   - `Запиши меня завтра вечером`
4. App parses/mock-parses:
   - date;
   - approximate time;
   - possible service.
5. App suggests matching available slots.

This is mocked in MVP.

---

# 12. Main screens / pages

## Client app

- Home
- SMS login
- Regular booking flow
- STRIGLO GO / outcall haircut
- Individual outcall request
- Haircut recommendation
- Booking success
- My bookings / activity
- Past visits

## Barber dashboard

- Today
- Bookings
- Requests
- Schedule
- Profile

## Admin panel

- Barbers
- Services
- Schedules
- Bookings
- STRIGLO GO settings

---

# 13. UI/UX decisions

## Product feeling

STRIGLO must feel like:

- mobile app;
- premium booking experience;
- dark barber-tech product;
- clean and fast interface.

Not like:

- old website;
- generic CRM;
- heavy admin panel;
- overloaded cyberpunk game UI.

---

## Visual direction

Style:

```text
modern dark barber-tech
premium dark UI
minimal cyberpunk accents
```

Inspiration:

- Uber;
- Linear;
- Arc Browser;
- modern fintech apps;
- subtle cyberpunk mood.

---

## Colors

Base:

- dark graphite background;
- layered dark cards;
- white primary text;
- soft gray secondary text.

Accent:

- burnt orange / warm barber orange for main actions.

STRIGLO GO:

- must be visible;
- should use red premium accent;
- old black STRIGLO GO button is deprecated.

Cyberpunk accents:

- minimal cyan/electric blue may be used carefully;
- do not overload.

---

## Animation philosophy

Animations should support UX, not distract from it.

Use:

- smooth transitions;
- microinteractions;
- tap feedback;
- sticky bottom action animation;
- skeleton loaders;
- glow feedback;
- card expand transitions;
- bottom sheet transitions;
- pull-to-refresh where useful.

Do not use:

- heavy particles;
- RGB overload;
- hacker-style UI;
- long loading animations;
- excessive neon.

---

## Skeleton loaders

Skeleton loaders are desired.

They should look modern and premium:

- dark surface;
- subtle shimmer;
- optional orange/cyber accent;
- not too bright.

---

## Pull-to-refresh

Pull-to-refresh can be used in activity / requests screens to create mobile-app feeling.

Example use:

- refresh active booking status;
- refresh STRIGLO GO request status;
- refresh barber responses.

---

## Main screen

Main screen must show two major actions:

1. `Записаться`
2. `Выездная стрижка`

Both should be clear and visible.

`Записаться` is the primary business action.  
`Выездная стрижка` is an important premium feature and must not be hidden.

---

# 14. STRIGLO GO decisions

STRIGLO GO is the premium outcall haircut feature.

Current decisions:

- It is important for product differentiation.
- It should be visible on the main screen.
- It can be shown as `Выездная стрижка` for clarity.
- Internally or as branding, `STRIGLO GO` may be used.
- Button/card should use red premium accent.
- Old black STRIGLO GO button is deprecated.
- The feature should not break regular salon schedule.
- Barbers should not randomly leave during normal workday unless system explicitly supports it later.

---

## STRIGLO GO models

There are two levels:

### 1. Planned outcall slots

These are scheduled slots where barber is available for outcall service.

Example:

- Thursday evening;
- Friday evening;
- selected special days.

Price is higher than regular in-salon haircut.

### 2. Individual premium request

If user does not find a suitable outcall slot, user can suggest own date/time.

This must be clearly explained:

- this is outside planned outcall schedule;
- it costs more;
- barber must confirm manually.

Do not make this feel like negotiation/chaos.

Avoid “bargaining” UI.

Prefer fixed premium logic or clearly calculated premium price.

---

# 15. Booking flow decisions

## Regular booking

The booking flow should not start with a traditional form.

After pressing `Записаться`, the user should immediately see available free slots for the nearest 3–4 days.

Do not show booked slots.

The user only cares about what is available.

---

## Slot visibility

Show:

- only free slots;
- grouped by day;
- nearest dates first.

Do not show:

- unavailable slots;
- crossed-out slots;
- booked slots;
- full timetable noise.

---

## Date selection

Primary flow:

- nearest 3–4 days are shown immediately.

Secondary flow:

- user can choose another date if the visible days do not fit.

Possible button:

- `Выбрать другую дату`
- `Показать больше дат`

---

## Sticky bottom action

After slot selection, sticky bottom CTA appears.

Example:

```text
Продолжить — 15:00
```

This is a key UX decision and should be implemented.

---

## Barber selection

The UI must adapt to number of barbers.

If one barber:

- do not force user to choose;
- show barber as automatically selected if useful.

If multiple barbers:

- allow choosing specific barber;
- allow option like `Любой быстрее`.

---

## Service selection

Keep minimal MVP services:

- `Стрижка`
- `Стрижка + борода`
- `Борода`

Service selection can be on the final confirmation screen together with name and phone.

Avoid adding too many service categories in MVP.

---

## Final booking step

Final screen/card should include:

- selected time;
- selected barber;
- service;
- name;
- phone;
- confirm button.

Phone can be autofilled from account.

User must be able to change it manually.

---

## Success screen

Success screen should combine:

- cinematic/premium success animation;
- useful booking card.

It should show:

- confirmation message;
- date;
- time;
- barber;
- service;
- location;
- maybe add-to-calendar action later.

---

# 16. Auth and phone number decisions

## Auth model

Use phone number + SMS code.

No email login in MVP.

No password login in MVP.

No classic registration in MVP.

---

## Phone number behavior

After SMS login / mock login:

- user phone number is known;
- booking flow can autofill phone number;
- user can manually change phone number in the booking form if needed.

---

## Belarus phone format

Default market is Belarus.

Prefer phone format with `+375`.

Do not use Polish `+48` as primary format.

---

## Account recovery

MVP decision:

- account is tied to phone number;
- if user loses phone number, account recovery is not a priority for MVP.

Future versions may add:

- email backup;
- Google/Apple login;
- support-assisted recovery.

---

## User history

After login, user can have:

- previous visits;
- active bookings;
- active STRIGLO GO requests;
- structured responses from barber.

Do not implement full chat in MVP.

---

# 17. Technical stack

## Current / preferred frontend stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Optional / planned tools

- shadcn/ui where useful
- Zustand if global state becomes necessary
- Zod for validation
- React Hook Form if forms become more complex

## Testing

- Vitest
- React Testing Library
- Playwright

## Backend direction

Supabase is the preferred backend direction if the current codebase already uses it.

Mock data is acceptable for MVP screens while backend flows are not finalized.

## Auth

- SMS OTP auth
- mock SMS login acceptable for MVP/demo

## Data

MVP can use mock data where real backend is not ready.

---

# 18. Deprecated / outdated assumptions

The following assumptions are deprecated unless this file says otherwise:

## Market

Deprecated:

- Poland as primary market.

Current:

- Belarus.

## Currency

Deprecated:

- PLN;
- zł as visible main booking currency.

Current:

- Belarusian rubles displayed as `50 р.` in user-facing booking UI.

## Phone format

Deprecated:

- Polish `+48` as primary phone format.

Current:

- Belarus `+375`.

## STRIGLO GO button

Deprecated:

- old black STRIGLO GO button.

Current:

- STRIGLO GO / outcall haircut must be visible and use red premium accent.

## Product type

Deprecated:

- ordinary website;
- classic landing page;
- generic booking form.

Current:

- mobile-first booking application.

## Chat

Deprecated for MVP:

- full chat/messenger between user and barber.

Current:

- structured proposal system:
  - confirm;
  - decline;
  - suggest another time.

## AI

Deprecated for MVP:

- real AI haircut generation;
- real face analysis.

Current:

- mocked haircut recommendation UX.

## Voice

Deprecated for MVP:

- real voice NLP.

Current:

- mocked voice parsing.

---

# 19. Rules for AI agents

## PROJECT_CONTEXT.md is the source of truth

This file is the main source of truth for the STRIGLO project.

Every AI agent must read this file before analyzing, editing, refactoring, redesigning or extending the project.

This applies to:

- ChatGPT;
- Codex;
- Cursor;
- v0;
- design agents;
- security agents;
- testing agents;
- review agents.

---

## Conflict rule

If old messages, old prompts, old code, comments, tests or README content conflict with `PROJECT_CONTEXT.md`, trust `PROJECT_CONTEXT.md`.

Examples:

- If old code uses PLN/zł but this file says Belarusian rubles, use Belarusian rubles.
- If old code uses Polish phone format but this file says Belarus phone direction, use Belarus direction.
- If old UI uses black STRIGLO GO button but this file says red premium accent, update toward this file.
- If old prompts describe STRIGLO as a website but this file says mobile-first app, treat app direction as correct.

---

## Legacy rule

If Polish elements exist in the project, treat them as legacy unless this file explicitly confirms them.

Possible legacy elements:

- Polish localization;
- PLN/zł prices;
- +48 phone format;
- Poland-specific assumptions;
- Polish market copy;
- old STRIGLO GO button styling.

---

## MVP discipline rule

Do not add advanced features unless requested.

Avoid turning MVP into:

- full CRM;
- full marketplace;
- full dispatcher system;
- full AI app;
- full chat app;
- full payment platform.

Build the core product first.

---

## UX rule

When adding features, preserve:

- booking speed;
- mobile-first UX;
- minimal friction;
- clear CTA;
- only useful motion;
- no visual overload.

---

## Testing rule

When changing core product logic, update or add tests.

Important flows that should be tested:

- regular booking;
- STRIGLO GO request;
- SMS/mock login;
- phone autofill;
- manual phone change;
- dynamic barber selection;
- only free slots shown;
- sticky bottom action;
- success screen.

---

# 20. Context update rule

After every completed task, the AI agent must check whether the main project context changed.

Update `PROJECT_CONTEXT.md` if the task changes any of the following:

- product logic;
- target market;
- localization;
- currency;
- MVP scope;
- UI/UX decisions;
- business logic;
- user roles;
- architecture;
- auth model;
- booking flow;
- STRIGLO GO logic;
- important technical decisions.

Do not update `PROJECT_CONTEXT.md` for minor changes such as:

- margin/padding tweaks;
- typo fixes;
- small refactors;
- temporary experiments;
- small style adjustments;
- minor copy changes that do not affect product direction.

If unsure whether context changed, ask:

```text
Does this change alter product truth or just implementation detail?
```

If it alters product truth, update this file.

---

# 21. Security note: what must never be stored in this file

Never store the following in `PROJECT_CONTEXT.md`:

- API keys;
- tokens;
- passwords;
- Supabase service_role keys;
- private keys;
- real user data;
- real client phone numbers;
- real booking data;
- private security notes;
- unresolved vulnerability details;
- internal secrets;
- production credentials;
- database passwords;
- SMS provider secrets.

This file may describe product architecture and public decisions, but must not contain secrets or sensitive operational data.
