# LAC Playwright Automation

A Playwright-based UI automation project for testing the LAC learning platform. This repository covers critical user flows such as login, signup, homepage course actions, cart behavior, sidebar navigation, and social media link verification.

The project follows a Page Object Model (POM) pattern and uses Playwright fixtures to keep tests readable, reusable, and maintainable.

## Demo / Target App

This automation is written against the live application:

- https://freelance-learn-automation.vercel.app

## Overview

The suite is designed to validate that the application behaves correctly across the main user journeys:

- User authentication and validation
- New user signup flow
- Course selection and cart updates
- Course removal behavior
- Sidebar navigation checks
- Social media buttons opening correct external pages

## Tech Stack

- JavaScript
- Node.js
- Playwright Test
- Page Object Model (POM)
- HTML reporting

## Project Structure

```bash
.
├── assets/
│   ├── lac-courses.json
│   └── lac-loginCred.json
├── fixtures/
│   └── auth.js
├── pages/
│   ├── cartpage.js
│   ├── homepage.js
│   ├── loginpage.js
│   └── signup.js
├── tests/
│   ├── auth/
│   │   ├── login.spec.js
│   │   └── signup.spec.js
│   ├── cartpage.spec.js
│   ├── homepage.spec.js
│   └── socialMedia.spec.js
├── .gitignore
├── package.json
├── playwright.config.js
├── playwright-report/
├── test-results/
└── README.md
```

## Features Covered

### Authentication Testing

The login tests validate:

- Valid user sign-in
- Invalid password flow
- Invalid email flow
- Empty email and password validation
- Missing password validation
- Required field error messages

File: `tests/auth/login.spec.js`

### Sign-up Testing

The signup tests validate:

- Fill all required fields successfully
- Missing name validation
- Missing email validation
- Missing password validation
- Missing interests validation
- Missing state validation
- Missing hobbies validation
- Navigation back to the login page

File: `tests/auth/signup.spec.js`

### Homepage and Cart Automation

The homepage tests validate:

- Adding multiple courses to cart
- Removing courses from cart
- Adding/removing individual courses one by one
- Sidebar navigation visibility

### Social Media Validation

The social media tests verify that clicking the social buttons opens the expected external pages in a new tab:

- YouTube
- Twitter/X
- LinkedIn
- Facebook

## Design Pattern

This project uses a clean Page Object Model approach:

- Each page has its own file under `pages/`
- Reusable actions like login, signup, cart interactions, and course selection are encapsulated in page classes
- Tests stay focused on behavior rather than DOM details
- Shared authenticated session logic is handled in `fixtures/auth.js`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

> If you are on a Linux environment and need browser dependencies, use:
>
> ```bash
> npx playwright install --with-deps
> ```

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/auth/login.spec.js
```

### Run in headed mode

```bash
npx playwright test --headed
```

### Run a specific test by name

```bash
npx playwright test -g "Sign in with correct credentials"
```

## Reporting

This project uses Playwright's HTML reporter.

To open the HTML report:

```bash
npx playwright show-report
```

Generated reports are also stored under the `playwright-report/` directory.

## Notes

- Some test data is stored in the `assets/` directory for login and course names.
- Authentication credentials and sample data are intentionally kept in local JSON files for the test environment.
- The suite is built for learning and automation practice, with test coverage focused on UI validation and common user flows.

## Suggested Improvements

If you want to extend this project further, here are good next steps:

- Add CI integration with GitHub Actions
- Add environment-based configuration for staging and production
- Add reporting with screenshots and traces for failed tests
- Add a reusable login helper for other test suites
- Convert the project to TypeScript for stronger typing and maintainability

## License

This project is currently using the ISC license as defined in `package.json`.

## Author

Built as a Playwright automation learning project for testing real-world UI flows.
