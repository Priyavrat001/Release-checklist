# Frontend

This frontend is a React + Vite release checklist app for Everstep. It connects to the backend API and provides the user interface for release creation, progress tracking, and checklist management.

## Features

- Create a new release with name, due date, and additional notes.
- View all releases in a responsive list/table.
- Open a release detail page.
- Toggle release checklist steps.
- Save release additional information.
- Responsive Tailwind UI.

## API integration

The app uses `axios` to connect to the backend API at `http://localhost:5000/api` by default.

### Available frontend routes

- `/` - release list and create release form
- `/release/:id` - release detail page with checklist and notes

## Local setup

1. Install frontend dependencies:

```bash
npm install
```

2. Start the Vite dev server:

```bash
npm run dev
```

3. Open the app in the browser.

## Testing

This frontend uses Vitest for automated testing. The setup is already configured in the project and supports component and UI-level checks.

### Testing tools

- Vitest: test runner for React/Vite apps
- jsdom: browser-like environment for rendering tests
- React DOM server rendering: used for simple markup verification in the starter test

### Test files

- [frontend/src/App.test.jsx](frontend/src/App.test.jsx) — starter test that verifies the app renders its main shell markup

### Commands to run tests

Run all frontend tests:

```bash
npm test
```

Run tests once and exit:

```bash
npm test -- --run
```

Run a specific test file:

```bash
npm test -- --run src/App.test.jsx
```

### Example test cases covered

The starter test currently checks that the app renders the expected UI content such as:

- the release checklist heading
- the app shell markup
- the main landing page content

### How to add more tests

1. Create a new file ending in `.test.jsx` or `.test.js` inside the `src` folder.
2. Import the component or page you want to test.
3. Use `describe`, `it`, and `expect` from Vitest.
4. Run the test suite with `npm test -- --run`.

Example pattern:

```jsx
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders expected content', () => {
    const html = renderToStaticMarkup(<MyComponent />);
    expect(html).toContain('Expected text');
  });
});
```

## Important files

- `src/api.js` - contains all backend API calls
- `src/pages/Home.jsx` - release list and create form
- `src/pages/ReleaseDetails.jsx` - detail page with checklist and notes
- `src/components/ReleaseForm.jsx` - create release UI
- `src/components/ReleaseList.jsx` - releases list UI
- `src/components/StepChecklist.jsx` - checklist toggle UI
