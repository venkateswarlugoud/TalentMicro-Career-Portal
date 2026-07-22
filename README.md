# Career Portal

A modern, responsive frontend Career Portal built with **Angular 21** for the **Angular Developer Fresher Assignment**. The application lets candidates browse job listings, view detailed job information, and submit job applications through a validated reactive form — all powered by static mock data and client-side filtering.

---

## Project Overview

**Career Portal** is a single-page application (SPA) that simulates a corporate careers website. Users can explore open roles, search and filter listings, read full job descriptions, and apply online with resume upload and cover letter support.

This project is a **frontend-only** implementation submitted as part of the Angular Developer Fresher Assignment. Job data is served from local mock data (no backend API), making the app easy to run locally for review and demonstration.

---

## Features Implemented

### Home Page

- **Hero Section** — Welcome banner with headline, subtitle, and a primary call-to-action to browse jobs
- **Portal Introduction** — Hero content introduces the Career Portal and its purpose
- **Search Jobs** — Keyword and location search form that navigates to the Jobs page with query parameters
- **Featured Categories** — Browseable job category cards with icons and job counts
- **Featured Jobs** — Highlighted job cards with company branding, location, salary, and quick apply links
- **Why Join Us** — “Why Choose Us” section showcasing platform benefits
- **Footer** — Global footer with branding, quick links, and copyright (via shared layout)

### Job Listing Page

- **Job Cards** — Rich cards displaying company logo, title, location, experience, salary, skills, and posted date
- **Search** — Filter by job title/keyword and location
- **Filters** — Employment type, experience level, and salary range filters with apply and clear actions
- **Sorting** — Sort by newest, oldest, salary (high/low), and title (A–Z)
- **Pagination** — Client-side pagination with page numbers, ellipsis, and result range display

### Job Details Page

- **Complete Job Information** — Full description, qualifications, and job summary
- **Company Information** — About Company section and company branding
- **Skills** — Required skills displayed as tags
- **Responsibilities** — Bulleted list of role responsibilities
- **Benefits** — Listed perks and benefits
- **Apply Button** — Prominent apply actions in the header and sidebar

### Apply Job

- **Reactive Form** — Built with Angular Reactive Forms and Angular Material form fields
- **Resume Upload** — PDF/Word file upload with type and size validation (max 5 MB)
- **Cover Letter** — Required textarea with minimum length validation
- **All Required Validations** — Full name, email, phone, location, experience, qualification, skills, company, CTC, notice period, resume, and cover letter

### Thank You Page

- Confirmation screen shown after a successful application submission
- Navigation links to return home or browse more jobs

### Additional Features

- **Responsive Design** — Bootstrap grid and custom SCSS for adaptive layouts
- **Mobile Friendly** — Collapsible navigation and stacked layouts on small screens
- **Tablet Friendly** — Optimized column layouts for medium breakpoints
- **Desktop Friendly** — Multi-column layouts, sticky sidebars, and expanded navigation
- **Empty State** — Friendly “No jobs found” message with clear-filters action on the Jobs page
- **Error State** — Dedicated 404 Not Found page with navigation recovery options
- **404 Not Found Page** — Catch-all routing redirects unknown paths to `/404`

### Bonus Features

- **Dark / Light Theme Toggle** — Theme switcher in the header with `localStorage` persistence
- **Grid & List View** — Toggle between grid and list layouts on the Jobs page
- **Save / Bookmark Jobs** — In-session bookmark toggle on job cards
- **Related Jobs** — Suggested similar roles on the Job Details page
- **Copy Job Link** — One-click copy of the current job URL to clipboard
- **URL Query Parameters** — Search keyword, location, and page number synced to the URL
- **Lazy-Loaded Routes** — Feature routes loaded on demand via `loadComponent`
- **Unit Tests** — Vitest specs for services, utilities, and components
- **Custom Form Validators** — Reusable validators for resume file type and size

---

## Technology Stack

| Technology | Purpose |
|---|---|
| **Angular 21** | Application framework |
| **TypeScript** | Typed JavaScript for components, services, and models |
| **SCSS** | Component and global styling with CSS custom properties |
| **Angular Router** | Client-side routing with lazy-loaded standalone components |
| **Reactive Forms** | Application form with validators on the Apply page |
| **Angular Signals** | Reactive state for jobs, filters, pagination, and theme |
| **RxJS** | Route parameter and query parameter observables |
| **Bootstrap 5** | Grid system, utilities, and base UI components |
| **Angular Material** | Icons, form fields, buttons, selects, and inputs |
| **Vitest** | Unit test runner |

---

## Folder Structure

```
TalentMicro-Career-Portal/
├── public/
│   └── assets/                  # Static assets (logo, favicon)
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── constants/       # Filter, sort, and form option constants
│   │   │   ├── data/            # Mock job and home page data
│   │   │   ├── footer/          # Global footer component
│   │   │   ├── header/          # Global header and navigation
│   │   │   ├── layout/          # App shell (header + router outlet + footer)
│   │   │   ├── models/          # TypeScript interfaces and types
│   │   │   ├── routing/         # Child route definitions
│   │   │   ├── services/        # JobService, ThemeService
│   │   │   └── validators/      # Custom reactive form validators
│   │   ├── features/
│   │   │   ├── apply/           # Job application form
│   │   │   ├── home/            # Landing page
│   │   │   ├── job-details/     # Single job detail view
│   │   │   ├── jobs/            # Job listing, filters, pagination
│   │   │   ├── not-found/       # 404 page
│   │   │   └── thank-you/       # Application success page
│   │   ├── app.config.ts        # Application providers
│   │   ├── app.routes.ts        # Root routes
│   │   └── app.ts               # Root component
│   ├── index.html
│   ├── main.ts
│   └── styles.scss              # Global theme tokens and shared styles
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (included with Node.js)

### Installation & Run

```bash
git clone https://github.com/venkateswarlugoud/TalentMicro-Career-Portal.git

cd TalentMicro-Career-Portal

npm install

ng serve
```

Open your browser and navigate to:

```
http://localhost:4200
```

### Build for Production

```bash
ng build
```

Build output is written to the `dist/` directory.

### Run Unit Tests

```bash
ng test
```

---

## Project Structure

### `core`

Contains application-wide building blocks that are not tied to a single feature:

- **Layout** — Shell component wrapping header, main content, and footer
- **Header / Footer** — Persistent navigation and site footer
- **Services** — `JobService` (mock data access) and `ThemeService` (dark/light mode)
- **Models** — Shared TypeScript interfaces for jobs, filters, and home page data
- **Data** — Static mock job listings and detail content
- **Constants** — Filter options, sort options, and form dropdown values
- **Validators** — Custom validators for resume file upload
- **Routing** — Child route configuration for feature pages

### `features`

Feature-specific pages, each implemented as a standalone component:

| Feature | Route | Description |
|---|---|---|
| Home | `/` | Landing page with search, categories, and featured jobs |
| Jobs | `/jobs` | Searchable, filterable job listing with pagination |
| Job Details | `/jobs/:id` | Full job description and related jobs |
| Apply | `/apply/:id` | Reactive application form |
| Thank You | `/thank-you` | Post-submission confirmation |
| Not Found | `/404` | 404 error page |

---

## Screenshots

> Add screenshots to a `docs/screenshots/` folder and replace the placeholders below.

### Home Page

![Home Page](./docs/screenshots/home-page.png)

### Jobs Page

![Jobs Page](./docs/screenshots/jobs-page.png)

### Job Details

![Job Details](./docs/screenshots/job-details.png)

### Apply Page

![Apply Page](./docs/screenshots/apply-page.png)

### Dark Mode

![Dark Mode](./docs/screenshots/dark-mode.png)

---

## Assumptions

- Job data is **static mock data** stored locally in `core/data/job.data.ts` — no REST API or database is required.
- Application submissions are **simulated**; form data is not sent to a backend and no email notifications are triggered.
- A valid job ID in the URL loads that job; invalid IDs fall back to default job content rather than showing a dedicated “job not found” page.
- Resume upload validation runs on the client only (file type and size); files are not uploaded to a server.
- Saved/bookmarked jobs persist **only for the current browser session** (in-memory state).
- Theme preference (light/dark) is stored in `localStorage` when available.
- Indian locale conventions are used for salary labels (LPA) and phone number validation (10-digit format).

---

## Known Limitations

- No backend integration — all data is mock/static and applications are not persisted.
- No loading indicators or skeleton screens (data loads synchronously from local sources).
- No authentication, user accounts, or application tracking dashboard.
- Saved jobs are lost on page refresh.
- Social share button on Job Details is present in the UI but does not integrate with external platforms.
- End-to-end (E2E) tests are not configured.
- No route guards or HTTP interceptors (not applicable without a backend).

---

## Future Improvements

- Connect to a REST API for dynamic job listings and application submission
- Add loading and error states for async API calls
- Persist saved jobs and application history (localStorage or user accounts)
- Implement authentication for recruiters and candidates
- Add server-side resume upload with cloud storage
- Integrate real social sharing (LinkedIn, Twitter/X, email)
- Add E2E tests with Playwright or Cypress
- Implement accessibility audit and WCAG compliance improvements
- Add job detail “not found” handling for invalid job IDs
- Support internationalization (i18n) for multi-language content

---

## Angular Best Practices Used

- **Standalone Components** — All components use the standalone API (no NgModules)
- **Routing** — Hierarchical routes with layout wrapper and wildcard redirect to 404
- **Lazy Loading** — Routes loaded on demand using `loadComponent`
- **Reactive Forms** — Typed form groups with built-in and custom validators on the Apply page
- **Dependency Injection** — Services injected via `inject()` and `providedIn: 'root'`
- **Angular Signals** — Signal-based state in services and feature components (`computed`, `signal`, `effect`)
- **Reusable Layout** — Shared header, footer, and layout shell across all pages
- **Separation of Concerns** — Feature pages, core services, models, constants, and utilities in dedicated folders
- **Unit Testing** — Vitest specs for filter utilities, pagination helpers, and core services
- **Type Safety** — Strongly typed models and constants throughout the codebase.

---

## Author

| | |
|---|---|
| **Name** | Venkateswarlu |
| **Email** | mr.venkateshd7@gmail.com |
| **GitHub** | [venkateswarlugoud](https://github.com/venkateswarlugoud) |

---

## License

This project was developed as an assignment submission. All rights reserved.