# Graph Report - operator-dashboard  (2026-08-22)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 213 nodes · 277 edges · 29 communities (23 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5943a98d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dashboard/page.tsx
- dependencies
- devDependencies
- compilerOptions
- client.ts
- createAdminClient
- EpisodeSubmission
- include
- package.json
- (dashboard)/layout.tsx
- recipes/route.ts
- app/layout.tsx
- src/middleware.ts
- [id]/route.ts
- hash_gen.js
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `EpisodeSubmission` - 11 edges
3. `Recipe` - 10 edges
4. `createClient()` - 9 edges
5. `OperatorProfile` - 7 edges
6. `createAdminClient()` - 7 edges
7. `include` - 7 edges
8. `PayoutRecord` - 5 edges
9. `formatCurrency()` - 5 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `ActiveRecipesProps` --references--> `Recipe`  [EXTRACTED]
  src/components/ActiveRecipes.tsx → src/lib/types.ts
- `SettingsViewProps` --references--> `OperatorProfile`  [EXTRACTED]
  src/components/SettingsView.tsx → src/lib/types.ts
- `SidebarProps` --references--> `OperatorProfile`  [EXTRACTED]
  src/components/Sidebar.tsx → src/lib/types.ts
- `UploadZoneProps` --references--> `EpisodeSubmission`  [EXTRACTED]
  src/components/UploadZone.tsx → src/lib/types.ts
- `DashboardOverviewProps` --references--> `EpisodeSubmission`  [EXTRACTED]
  src/components/DashboardOverview.tsx → src/lib/types.ts

## Import Cycles
- None detected.

## Communities (29 total, 6 thin omitted)

### Community 0 - "dashboard/page.tsx"
Cohesion: 0.12
Nodes (19): ActiveRecipes(), ActiveRecipesProps, Header(), HeaderProps, SettingsView(), SettingsViewProps, Sidebar(), SidebarProps (+11 more)

### Community 1 - "dependencies"
Cohesion: 0.07
Nodes (29): bcryptjs, canvas-confetti, clsx, date-fns, framer-motion, lucide-react, next, dependencies (+21 more)

### Community 2 - "devDependencies"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/bcryptjs (+11 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "client.ts"
Cohesion: 0.20
Nodes (7): AdminDashboard(), SubmissionsPage(), SetupAccountForm(), OperatorPortalApp(), AuthView(), AuthViewProps, createClient()

### Community 5 - "createAdminClient"
Cohesion: 0.26
Nodes (7): dynamic, OperatorsPage(), POST(), POST(), createAdminToken(), encodedKey, createAdminClient()

### Community 6 - "EpisodeSubmission"
Cohesion: 0.28
Nodes (9): DashboardOverview(), DashboardOverviewProps, PayoutsQA(), PayoutsQAProps, EpisodeSubmission, PayoutRecord, QAStatus, formatBytes() (+1 more)

### Community 7 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 8 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 11 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 12 - "src/middleware.ts"
Cohesion: 0.60
Nodes (3): updateSession(), config, middleware()

### Community 13 - "[id]/route.ts"
Cohesion: 0.83
Nodes (3): DELETE(), getAdminClient(), PUT()

## Knowledge Gaps
- **72 isolated node(s):** `HeaderProps`, `AdminProfile`, `IngestionFileItem`, `AuthViewProps`, `MOCK_PAYOUTS` (+67 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `HeaderProps`, `AdminProfile`, `IngestionFileItem` to the rest of the system?**
  _72 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dashboard/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12043010752688173 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._