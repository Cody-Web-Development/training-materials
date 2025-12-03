# Dashboard Components - Visual Guide

## Component Hierarchy

```
DashboardLayout (Main wrapper)
├── DashboardHeader (Top bar)
│   ├── Search input
│   ├── Notifications bell
│   └── User dropdown menu
├── DashboardSidebar (Left navigation)
│   ├── Logo
│   ├── Nav items
│   │   ├── Main items
│   │   └── Sub items
│   └── Footer
└── Main Content Area
    ├── Page title
    ├── Header actions
    └── Content slots
        ├── StatsCard (1-4 per row)
        ├── ChartCard
        ├── Card (Generic container)
        ├── DataTable
        ├── RecentActivityCard
        └── Custom content
```

## Component Relationships

```
┌─────────────────────────────────────────────────┐
│        APP PAGES (Dashboard, Users, etc)        │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  DashboardLayout     │
        │  (manages sidebar)   │
        └──────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
   ┌─────────────┐    ┌──────────────────┐
   │Header       │    │Sidebar           │
   │- Search     │    │- Navigation      │
   │- Notify     │    │- Submenu         │
   │- User menu  │    │- Toggle on mobile│
   └─────────────┘    └──────────────────┘
        │
        │ (Both interact with layout state)
        │
        ▼
   ┌──────────────────────────────────────┐
   │    Page Content / Components         │
   │  ┌─────────────────────────────────┐ │
   │  │ Stats (1-4 cards in grid)       │ │
   │  │ ┌──────┐ ┌──────┐ ┌──────┐     │ │
   │  │ │ Card │ │ Card │ │ Card │ ... │ │
   │  │ └──────┘ └──────┘ └──────┘     │ │
   │  └─────────────────────────────────┘ │
   │  ┌─────────────────────────────────┐ │
   │  │ Charts & Activity (3-col grid)  │ │
   │  │ ┌────────────────┐ ┌──────────┐ │ │
   │  │ │ ChartCard      │ │ Card     │ │ │
   │  │ │ (2-col)        │ │ (1-col)  │ │ │
   │  │ └────────────────┘ └──────────┘ │ │
   │  └─────────────────────────────────┘ │
   │  ┌─────────────────────────────────┐ │
   │  │ DataTable / Detailed View       │ │
   │  │ ┌──────────────────────────────┐│ │
   │  │ │ Columns │ Data │ Actions    ││ │
   │  │ └──────────────────────────────┘│ │
   │  └─────────────────────────────────┘ │
   └──────────────────────────────────────┘
```

## Layout Grid System

### Stats Row (Responsive Grid)
```
Desktop (4 columns):
┌────┐ ┌────┐ ┌────┐ ┌────┐
│ S1 │ │ S2 │ │ S3 │ │ S4 │
└────┘ └────┘ └────┘ └────┘

Tablet (2 columns):
┌────────┐ ┌────────┐
│ S1     │ │ S2     │
└────────┘ └────────┘
┌────────┐ ┌────────┐
│ S3     │ │ S4     │
└────────┘ └────────┘

Mobile (1 column):
┌──────────┐
│ S1       │
└──────────┘
┌──────────┐
│ S2       │
└──────────┘
```

### Charts & Activity Row (3-Column Grid)
```
Desktop (3 columns):
┌──────────────────┐ ┌────────┐
│ ChartCard        │ │ Activity│
│ (col-span-2)     │ │ (1 col) │
└──────────────────┘ └────────┘

Tablet (1 column - stacked):
┌─────────────────┐
│ ChartCard       │
└─────────────────┘
┌─────────────────┐
│ RecentActivity  │
└─────────────────┘

Mobile (1 column - stacked):
┌─────────────────┐
│ ChartCard       │
└─────────────────┘
┌─────────────────┐
│ RecentActivity  │
└─────────────────┘
```

## Navigation Structure

### Sidebar Navigation

```
┌──────────────────┐
│  LOGO            │
├──────────────────┤
│ 📊 Dashboard     │
│ 👥 Users      12 │  <- Badge
│ 🏦 Banks         │
│ ⚙️ Settings      │
│   • Profile      │  <- Sub-item
│   • Password     │
│   • Appearance   │
├──────────────────┤
│  © 2025 v1.0.0   │
└──────────────────┘
```

## Header Bar Layout

```
┌─────────────────────────────────────────────┐
│ ☰ │          🔍 Search          │ 🔔 👤 ▼  │
├─────────────────────────────────────────────┤
│                    3                         │  <- Notification badge
└─────────────────────────────────────────────┘
```

### User Dropdown Menu
```
┌────────────────────┐
│ John Doe           │
│ john@example.com   │
├────────────────────┤
│ Profile Settings   │
│ Appearance         │
├────────────────────┤
│ Logout             │  <- Red text
└────────────────────┘
```

## StatsCard Layout

```
┌──────────────────────────┐
│ Total Users        📊    │
│ 1,234                    │
│ +12% ↑ from last month   │
└──────────────────────────┘
  ^       ^            ^
  │       │            │
  │       │            └─ Trend text (green/red)
  │       └────────────── Value (large)
  └────────────────────── Title + Icon (colored bg)
```

## Card Component Layout

```
┌──────────────────────────────┐
│ Card Title         [Action]  │  <- header
│ Description                  │
├──────────────────────────────┤
│                              │
│  Main Content (Slot)         │
│                              │
├──────────────────────────────┤
│ [Button] [Button] [Button]   │  <- footer
└──────────────────────────────┘
```

## DataTable Layout

```
┌─────────────────────────────────────┐
│ ID  │ Name   │ Email      │ Status  │
├─────┼────────┼────────────┼─────────┤
│ 1   │ John   │ john@...   │ Active  │
│ 2   │ Jane   │ jane@...   │ Active  │
│ 3   │ Bob    │ bob@...    │ Inactive│
└─────┴────────┴────────────┴─────────┘
  ↑       ↑         ↑          ↑
  └─ Sortable columns (click header)
  └─ Striped rows (alternating color)
  └─ Hover effect (highlight row)
  └─ Custom cell slots for rendering
```

## Responsive Behavior

### Mobile (< 768px)
```
┌──────────────────┐
│ ☰    🔔  👤      │  <- Compact header
├──────────────────┤
│                  │
│  Main Content    │
│  (Full width)    │
│                  │
├──────────────────┤
│ Sidebar Overlay  │  <- Hidden by default, overlay on toggle
└──────────────────┘
```

### Tablet (768px - 1024px)
```
┌──────────────────────────────┐
│  Logo  [Search]    🔔  👤    │
├──────────┬────────────────────┤
│          │                    │
│ Sidebar  │   Main Content     │
│ (fixed)  │   (responsive)     │
│          │                    │
└──────────┴────────────────────┘
```

### Desktop (> 1024px)
```
┌─────────────────────────────────────────┐
│ Logo    [Search]      🔔  👤  [Theme]   │
├──────────────┬────────────────────────────┤
│              │                            │
│ Sidebar      │     Main Content           │
│ (64px wide)  │     (max-width: 1400px)    │
│ Always open  │                            │
│              │                            │
└──────────────┴────────────────────────────┘
```

## Color Palette Usage

```
Primary (Indigo-600)
- Active navigation items
- Buttons and CTAs
- Focus states
- Links

Background (White / Gray-50)
- Cards
- Page background
- Sidebar background (Dark gray-900)

Text
- Primary: Gray-900
- Secondary: Gray-600
- Tertiary: Gray-500
- On dark: White

States
- Success (Green): Positive trends, verified
- Warning (Yellow): Pending, caution
- Danger (Red): Errors, negative, logout
- Info (Blue): Information, notifications
```

## Common Patterns

### Dashboard Stats + Charts
```
┌─────────────────────────────┐
│ Stat  Stat  Stat  Stat      │  <- 4-col grid
└─────────────────────────────┘
┌────────────────┬─────────────┐
│ Chart          │ Sidebar     │  <- 2:1 grid
│ (col-span-2)   │             │
└────────────────┴─────────────┘
```

### List/Table View
```
┌──────────────────────────┐
│ Title           [+ Add]  │  <- header-action slot
├──────────────────────────┤
│ DataTable with sorting   │
│ and custom renderers     │
└──────────────────────────┘
```

### Settings Form
```
┌──────────────────────────┐
│ Settings Title           │
├──────────────────────────┤
│ Form fields              │
│ [Save] [Cancel]          │  <- footer slot
└──────────────────────────┘
```

## Interactive Elements

### Buttons
```
Primary:    [Indigo BG] white text
Secondary:  Gray-100 BG with gray text
Danger:     Red BG with white text
Active:     Highlighted with border/bg
Hover:      Darker shade + transition
```

### Links
```
Text color: Indigo-600
Hover:      Underline + darker color
Active:     Darker color
```

### Form Inputs
```
Background:   Gray-100
Border:       Gray-300
Focus:        Blue ring + white bg
Error:        Red ring + pink bg
Placeholder:  Gray-400 text
```

## Animation & Transitions

```
Sidebar:      translate-x (300ms)
Hover:        shadow, bg-color (150ms)
Loading:      spinner rotation (1s infinite)
Dropdown:     fade + scale (150ms)
Transitions:  ease-in-out timing
```

---

**Pro Tip:** Use this guide as a reference when creating custom pages and components for your dashboard!
