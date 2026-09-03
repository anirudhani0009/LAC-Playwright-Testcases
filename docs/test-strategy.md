# Test Strategy

## Purpose

This project is a focused Playwright portfolio suite for the LAC learning platform. It demonstrates how a QA engineer can automate high-value user journeys without attempting to test every feature of an application they do not control.

## Scope

The suite currently covers:

- Login success and failure behavior
- Browser-native email validation and required fields
- Signup form required-field behavior without creating disposable accounts
- Course add and remove behavior
- Cart counts and total-price calculations
- Enrollment modal completion and cancellation
- Sidebar navigation
- External social-media links opening in new tabs
- Chromium, Firefox, and WebKit project configuration

## Risk-Based Priorities

| Priority | Risk | Coverage |
| --- | --- | --- |
| High | Users cannot authenticate or receive unclear validation feedback | Login happy path, invalid credentials, required fields, email format |
| High | Cart contents or totals are incorrect | Add/remove flows, item counts, calculated totals |
| High | Enrollment cannot complete or cancel safely | Enrollment form, order ID, cancellation, cart clearing |
| Medium | Users cannot navigate the authenticated area | Sidebar options and return navigation |
| Medium | External links point to the wrong destination | New-tab URL checks |
| Lower | Full signup lifecycle against the external application | Intentionally limited to form validation to avoid creating test accounts |

## Test Design

- Tests use Playwright Test with Chromium, Firefox, and WebKit projects enabled in the current configuration.
- Page Object Model classes keep selectors and user actions reusable.
- Fixtures compose setup for login, authenticated pages, signup navigation, and cart state.
- Assertions remain in test files so each test states its expected behavior.
- Test data is kept separate from test actions; credentials are supplied through environment variables.
- Tests avoid fixed sleeps and use Playwright locator assertions and auto-waiting.

## Out of Scope

The following are not currently covered:

- Full signup submission and account creation
- Accessibility audits
- Responsive/mobile layouts
- API or database testing
- Payment processing
- Performance and load testing

These exclusions are deliberate because the target application is an external practice application and the project is intended to demonstrate focused UI automation skills.

## Execution and Evidence

Local commands and CI behavior are documented in the root README. CI runs the suite with environment-provided credentials and stores the HTML report and available Playwright failure artifacts.

## Maintenance Approach

When the application changes, update selectors in the relevant page object, review affected risk areas, and run the focused spec before the full suite. A failing test should be investigated for an application defect, test defect, or environment issue before adding retries.
