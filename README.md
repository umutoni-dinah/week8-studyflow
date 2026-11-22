# StudyFlow

StudyFlow is a responsive study-planning website built with React. Students can organise study tasks, track progress, use a focus timer, and save their preferences in the browser.

This is a front-end-only project. It uses local JavaScript data and browser `localStorage`; it does not use an API, backend, database, or authentication.

## Project links

- **GitHub repository:** [StudyFlow on GitHub](https://github.com/umutoni-dinah/week8-studyflow)
- **Live website:** https://week8-studyflow.vercel.app/
- **Video walkthrough:** https://youtu.be/CcMTmtrVB1c

## Features

- **Dashboard:** Shows total, pending, and completed tasks, progress, and upcoming tasks. Counts are derived from the shared task list.
- **Tasks:** Add, edit, delete, and complete tasks. Search by title, filter by category and status, and sort by due date or title. The form validates blank titles and the page distinguishes an empty task list from empty search results.
- **Focus:** Start, pause, and reset Study and Break timers. Switching sessions resets the timer.
- **Settings:** Save a display name, preferred Study duration, and compact-spacing preference in the browser.
- **Responsive navigation:** Move between Dashboard, Tasks, Focus, and Settings. Unknown routes show a Not Found page.

## Getting started

You’ll need Node.js and npm installed.

```bash
npm install
npm run dev
```

Open the local address printed in the terminal to view the website.

To create a production build:

```bash
npm run build
```

## Project structure

```text
src/
├── components/
│   ├── FocusTimer.jsx
│   ├── SummaryCard.jsx
│   ├── TaskCard.jsx
│   ├── TaskFilters.jsx
│   └── TaskForm.jsx
├── data/
│   ├── defaultSettings.js
│   └── initialTasks.js
├── hooks/
│   ├── useDebounce.js
│   ├── useDocumentTitle.js
│   ├── useLocalStorage.js
│   └── useToggle.js
├── layouts/
│   └── SiteLayout.jsx
├── pages/
│   ├── DashboardPage.jsx
│   ├── FocusPage.jsx
│   ├── SettingsPage.jsx
│   └── TasksPage.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## State and component design

`App.jsx` owns the shared task state because both the Dashboard and Tasks pages need the same list. It passes tasks and task-changing callbacks to those pages. Updating a task on the Tasks page therefore updates the Dashboard as well.

`SiteLayout` provides the shared header, navigation, and page container. Components such as `TaskCard`, `TaskForm`, `TaskFilters`, and `SummaryCard` receive their data and callbacks through props.

## Hooks, effects, and persistence

- `useLocalStorage` restores and saves tasks and settings in the current browser.
- `useToggle` manages the Study and Break session choice.
- `useDocumentTitle` updates the browser tab title for each page and includes the pending task count on the Tasks page.
- `useDebounce` delays task search updates while the student is typing.
- `useRef` focuses the task search field and stores the timer interval ID.
- The timer interval is cleared in an effect cleanup function, preventing leftover intervals.

## Rendering and performance

The timer’s changing seconds are state inside `FocusTimer`, so each timer tick does not update the shared task state in `App.jsx`. React can render a component when its state changes; the browser DOM is updated only where the rendered result differs.

`TasksPage` uses `useMemo` for the combined search, filtering, and sorting calculation. With a small task list, the performance benefit is modest, but it keeps the derived list calculation tied to its inputs. The React Compiler can automate some memoization; this project does not require compiler setup.

## What I learned

- How to organise a multi-page React app with reusable components, props, children, and React Router.
- How to manage shared state, controlled forms, validation, and immutable list updates.
- How to derive filtered and sorted results from state and save data in `localStorage`.
- How to use custom Hooks, refs, and effect cleanup for practical interface features.
- How React rendering works and how keeping timer state local avoids unrelated updates.