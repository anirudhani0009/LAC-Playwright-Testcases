# LAC Playwright Automation

## Overview

**LAC Playwright Automation** is a focused UI automation suite for demonstrating Playwright skills against the LAC learning platform. Built with **Playwright Test** and following the **Page Object Model (POM)** architecture, it covers selected high-value user workflows.

The suite provides end-to-end checks across login validation, signup form requirements, course cart operations, enrollment, navigation, and third-party links. It is intentionally a portfolio-sized smoke/regression suite rather than complete application coverage.

### Key Highlights

- ✅ **Page Object Model Architecture** – Clean separation of concerns and reusable page components
- ✅ **Fixture-Based Authentication** – Reusable login setup for authenticated tests
- ✅ **Focused Risk-Based Coverage** – Authentication, signup validation, homepage, cart, and social media checks
- ✅ **HTML Reporting** – Detailed test reports with full visibility into pass/fail results
- ✅ **Parallel Execution Ready** – Optimized for concurrent test runs
- ✅ **Easy Local & CI/CD Integration** – Works seamlessly with GitHub Actions and other CI platforms

## Target Application

This automation suite is built and maintained against:

- **Production App:** https://freelance-learn-automation.vercel.app
- **Framework:** Modern learning platform with course catalog, user authentication, and shopping cart functionality

## Overview

The suite is designed to validate that the application behaves correctly across the main user journeys:

- User authentication and validation
- New user signup flow
- Course selection and cart updates
- Course removal behavior
- Sidebar navigation checks
- Social media buttons opening correct external pages

## Tech Stack & Dependencies

| Technology | Version | Purpose |
|------------|---------|---------|
| **JavaScript (ES6+)** | Latest | Primary programming language |
| **Node.js** | 20.x or higher | Runtime environment |
| **Playwright** | 1.62.1 | Browser automation framework |
| **Playwright Test** | 1.62.1 | Test runner with parallelization |
| **HTML Reporter** | Built-in | Test results visualization |

## Prerequisites

Before setting up this project, ensure you have:

- **Node.js** (v20.0 or later) – [Download here](https://nodejs.org/)
- **npm** (bundled with Node.js)
- **Git** – For version control
- **A modern code editor** – VS Code recommended
- **Stable internet connection** – For accessing the target application and installing dependencies

## Project Architecture

### Directory Structure

```bash
.
├── assets/                          # Test data and configuration
│   ├── lac-courses.json            # Course catalog data
│   └── lac-loginCred.json           # Legacy test data; do not commit credentials
│
├── fixtures/                        # Reusable test setup
│   ├── auth.js                     # Shared authentication fixture
│   ├── cartFixture.js              # Cart operations fixture
│   ├── loginFixture.js             # Login helper fixture
│   └── signupFixture.js            # Signup helper fixture
│
├── pages/                          # Page Object Model classes
│   ├── cartpage.js                 # Shopping cart page interactions
│   ├── homepage.js                 # Homepage course selections
│   ├── loginpage.js                # Login page elements & methods
│   └── signup.js                   # Signup form interactions
│
├── tests/                          # Test specifications
│   ├── auth/
│   │   ├── login.spec.js           # Login validation tests
│   │   └── signup.spec.js          # Signup validation tests
│   ├── cartpage.spec.js            # Cart functionality tests
│   ├── homepage.spec.js            # Homepage interaction tests
│   └── socialMedia.spec.js         # Social media link verification
│
├── docs/                           # QA strategy and reporting examples
│   ├── test-strategy.md             # Scope, risks, and test approach
│   ├── coverage-matrix.md           # Feature-to-test coverage mapping
│   └── defect-report-example.md     # Illustrative defect report
│
├── .github/
│   └── workflows/
│       └── playwright.yml            # GitHub Actions test workflow
├── .env.example                     # Environment variable template
├── playwright-report/              # Generated HTML reports
├── test-results/                   # Test execution artifacts
├── .gitignore                      # Git ignore rules
├── package.json                    # Project dependencies & metadata
├── package-lock.json               # Locked dependency versions
├── playwright.config.js            # Playwright configuration
└── README.md                       # This file
```

The local `.env` file is intentionally omitted from this tree because it is ignored by Git. Copy `.env.example` to `.env` and provide test-only credentials locally when needed.

### QA Documentation

The [QA test strategy](docs/test-strategy.md) explains the risk-based scope, test-design decisions, and intentional exclusions. The [coverage matrix](docs/coverage-matrix.md) maps user risks to executable tests, while the [defect report example](docs/defect-report-example.md) demonstrates clear QA communication.

### Design Pattern: Page Object Model (POM)

This project follows the **Page Object Model** design pattern:

- **Page Classes** – Each web page is represented as a class encapsulating selectors and interactions
- **Reusable Methods** – Common actions (login, add to cart, navigate) are methods on page classes
- **Clean Test Code** – Test files focus on business logic rather than DOM manipulation
- **Maintainability** – UI changes require updates in one place (page class), not scattered across tests
- **Scalability** – New tests can quickly reuse existing page methods

## Test Suite Capabilities

This automation suite provides focused validation across five key user journey areas:

### 1. Authentication & Login Validation

**File:** [tests/auth/login.spec.js](tests/auth/login.spec.js)

Validates the login workflow and selected client/server-side validation cases:

- ✅ Valid user sign-in with correct credentials
- ✅ Invalid password handling and error messaging
- ✅ Invalid email format validation
- ✅ Empty email field validation
- ✅ Empty password field validation
- ✅ Missing password error handling
- ✅ Required field error message display

**Key Test Scenarios:**
- Valid credentials authentication flow
- Security: Incorrect credential rejection
- Input validation: Format and presence checks
- User feedback: Clear error messaging

### 2. User Registration (Signup) Testing

**File:** [tests/auth/signup.spec.js](tests/auth/signup.spec.js)

Checks signup form requirements and navigation:

- ✅ Valid form completion enables signup
- ✅ Name field validation and requirements
- ✅ Email field validation and format checking
- ✅ Password field required validation
- ✅ Interests selection validation
- ✅ State selection validation
- ✅ Hobbies selection validation
- ✅ Navigation back to login page

**Key Test Scenarios:**
- Valid form completion
- Individual required-field validation
- Navigation back to the login page

### 3. Homepage & Course Catalog

**File:** [tests/homepage.spec.js](tests/homepage.spec.js)

Validates the core course browsing and selection experience:

- ✅ Adding multiple courses to shopping cart
- ✅ Removing individual courses from cart
- ✅ Cart item count updates
- ✅ Sidebar navigation visibility and functionality

**Key Test Scenarios:**
- Cart operations (add/remove)
- Bulk and individual course management
- Sidebar navigation

### 4. Shopping Cart Operations

**File:** [tests/cartpage.spec.js](tests/cartpage.spec.js)

Ensures shopping cart reliability and accuracy:

- ✅ Displaying all added courses with prices
- ✅ Accurate total price calculation
- ✅ Removing courses from cart with confirmation
- ✅ Quantity updates and price recalculation
- ✅ Empty cart state handling
- ✅ Checkout readiness validation

**Key Test Scenarios:**
- Cart accuracy and calculations
- Item lifecycle (add/remove)
- Price and total validation
- Enrollment and navigation

### 5. Social Media Integration

**File:** [tests/socialMedia.spec.js](tests/socialMedia.spec.js)

Verifies external social media links function correctly:

- ✅ YouTube channel link opens in new tab
- ✅ Twitter/X profile link opens in new tab
- ✅ LinkedIn company page link opens in new tab
- ✅ Facebook page link opens in new tab
- ✅ Correct URLs are targeted
- ✅ Links open in new browser tabs

**Key Test Scenarios:**
- Multi-tab page handling
- URL validation and verification
- External link integrity

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/LAC-Playwright.git
cd LAC-Playwright
```

### Step 2: Install Node.js Dependencies

```bash
npm install
```

This installs all required packages defined in `package.json`, including Playwright and the test runner.

### Step 3: Install Playwright Browsers

```bash
npx playwright install
```

This downloads the Playwright browser binaries. The current configuration runs the suite against Chromium, Firefox, and WebKit.

**For Linux environments** (with additional system dependencies):

```bash
npx playwright install --with-deps
```

### Step 4: Verify Installation

```bash
npx playwright --version
```

You should see the installed Playwright version displayed.

### Step 5: Configure Environment Variables

Authenticated tests require a dedicated test account. Set the credentials through environment variables and do not commit them:

```powershell
$env:LAC_USERNAME="your-test-account@example.com"
$env:LAC_PASSWORD="your-test-account-password"
```

The target URL can be overridden with `BASE_URL`:

```powershell
$env:BASE_URL="https://your-test-environment.example.com"
```

Course selections are maintained in `assets/lac-courses.json`. The legacy credential file is still referenced by some validation tests and should be removed as part of the credential-cleanup work.

## Running Tests

### Run All Tests

```bash
npm test
```

Executes the entire test suite with default configuration (headless mode, sequential or parallel based on config).

### Run Tests in Headed Mode

```bash
npm run test:headed
```

Launches browser windows showing test execution in real-time. Useful for debugging and visual verification.

### Run a Specific Test File

```bash
npx playwright test tests/auth/login.spec.js
```

Runs only the login tests.

```bash
npx playwright test tests/cartpage.spec.js
```

Runs only the cart page tests.

### Run Tests by Name (Pattern Matching)

```bash
npx playwright test -g "Add multiple courses"
```

Runs tests matching the specified pattern. The `-g` flag filters tests by name.

### Run Tests with Debugging

```bash
npm run test:debug
```

Opens Playwright Inspector for step-by-step debugging with code navigation and DOM inspection.

### Run Tests in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run the suite against one browser engine at a time. The complete configured matrix can be run with `npm test`.

### Run Tests with Verbose Output

```bash
npx playwright test --reporter=verbose
```

Displays detailed information about each test step and assertion.

### Run Tests with Screenshots on Failure

```bash
npx playwright test --screenshot=only-on-failure
```

Captures screenshots only when tests fail, useful for debugging.

## Test Reporting

### View HTML Report

After test execution, view the HTML report:

```bash
npm run test:report
```

This opens the report in your default browser showing:
- Test execution timeline
- Pass/fail status for each test
- Failed test details and error messages
- Screenshots and videos (if configured)
- Timing information

### Report Artifacts

Generated reports are stored in:
- `playwright-report/` – HTML report directory
- `test-results/` – Raw test results and logs

## Configuration

### Playwright Configuration File

Edit `playwright.config.js` to customize test behavior:

```javascript
// Key configuration options
{
  testDir: './tests',                    // Directory containing test files
  fullyParallel: true,                   // Run tests in parallel
  forbidOnly: !!process.env.CI,          // Fail if test.only() used in CI
  retries: process.env.CI ? 2 : 0,       // Retry failed tests (CI only)
  workers: process.env.CI ? 1 : undefined, // Workers per browser
  reporter: 'html',                      // HTML reporter
  use: {
    baseURL: process.env.BASE_URL || 'https://freelance-learn-automation.vercel.app',
    trace: 'on-first-retry',             // Trace failed tests
  },
  webServer: {                           // Optional: start local server
    // command: 'npm run start',
    // port: 3000,
  }
}
```

### Fixtures (Reusable Test Setup)

The `fixtures/` directory contains reusable setup logic:

- **auth.js** – Logs in and provides `login` and `home` page objects for authenticated tests
- **cartFixture.js** – Pre-configured cart state for cart-specific tests
- **loginFixture.js** – Reusable login helper
- **signupFixture.js** – Reusable signup helper

Usage in tests:
```javascript
const { test } = require('./fixtures/auth.js');

test('Add course to cart', async ({ auth }) => {
  const { home } = auth;
  // Test starts on the authenticated homepage
});
```

## Best Practices

### 1. Page Object Model Conventions

- **Selectors First** – Define all DOM selectors at the class level
- **Action Methods** – Create descriptive methods for user interactions (e.g., `fillLoginForm()`, `clickAddToCart()`)
- **No Direct Assertions in Pages** – Keep page classes free of assertions; use them only in tests
- **Reusable Workflows** – Create helper methods for complex multi-step interactions

Example Page Class Structure:
```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    // Selectors
    this.emailInput = '[data-testid="email-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = 'button:has-text("Sign In")';
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
```

### 2. Test Organization

- **Descriptive Test Names** – Use clear, business-language test names
- **One Assertion Focus** – Each test should validate a single behavior when possible
- **Setup & Teardown** – Use `test.beforeEach()` for common setup and fixtures for authentication
- **Avoid Test Interdependencies** – Each test should run independently

### 3. Fixture Best Practices

- **Use Fixtures for Cross-Cutting Concerns** – Authentication, database state, test data
- **Compose Fixtures** – Combine base fixtures to create more complex scenarios
- **Clean Up Resources** – Ensure teardown code runs to close connections and clear state

### 4. Performance & Reliability

- **Wait Strategies** – Use explicit waits (`.waitForSelector()`, `.waitForNavigation()`) instead of sleeps
- **Retry Strategies** – Configure retries for flaky tests but investigate root causes
- **Headless Execution** – Run headless in CI/CD for speed; use headed mode locally for debugging
- **Parallel Execution** – Enable parallel test runs to reduce total execution time

### 5. Data Management

- **Separate Test Data** – Keep test data in `assets/` directory, not hardcoded in tests
- **Environment-Specific Config** – Use `.env` files for different environments (dev, staging, production)
- **Reset Between Tests** – Clear test users and data between test runs when necessary

## Troubleshooting

### Common Issues & Solutions

#### Issue: Tests Timeout or Hang

**Solution:**
- Increase timeout in `playwright.config.js`: `use: { timeout: 30000 }`
- Check target application availability: `https://freelance-learn-automation.vercel.app`
- Add explicit waits: `await page.waitForLoadState('networkidle')`

#### Issue: "Browser Not Found" Error

**Solution:**
```bash
# Reinstall Playwright browsers
npx playwright install

# For Linux with dependencies
npx playwright install --with-deps
```

#### Issue: Tests Pass Locally but Fail in CI/CD

**Solution:**
- Check environment variables and credentials are set in CI/CD
- Ensure target application is accessible from CI environment
- Consider network delays; increase timeout values for CI
- Use `--reporter=verbose` to capture detailed logs

#### Issue: "Element Not Found" Errors

**Solution:**
- Verify selectors match current application DOM
- Add explicit waits before interaction: `await page.waitForSelector(selector)`
- Use Page Inspector to verify element locators
- Check for dynamic content loading delays

#### Issue: Flaky Tests (Intermittent Failures)

**Solution:**
- Avoid hard-coded `setTimeout()` calls
- Replace with explicit waits: `waitForNavigation()`, `waitForLoadState()`
- Increase timeout values moderately
- Review test logs for timing issues
- Enable tracing: `trace: 'on-first-retry'` in config

#### Issue: Tests Run Out of Memory

**Solution:**
- Reduce parallel worker count: `workers: 4` in config
- Close browser contexts properly in fixtures
- Monitor test memory usage with `--reporter=verbose`

### Debugging Techniques

#### Using Playwright Inspector

```bash
npx playwright test --debug
```

- Step through test execution line-by-line
- Inspect DOM and element selectors
- Execute arbitrary JavaScript in page context

#### Capturing Traces

Add to `playwright.config.js`:
```javascript
use: {
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

Traces help understand what happened before a failure.

#### Verbose Logging

```bash
DEBUG=pw:api npx playwright test
```

Shows detailed Playwright API calls and timing information.

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/tests.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## Advanced Topics

### Running Tests Against Different Environments

```bash
# Staging environment
BASE_URL=https://staging.freelance-learn.com npm test

# Production environment
BASE_URL=https://freelance-learn-automation.vercel.app npm test
```

### Parallel Test Execution with Custom Configuration

Modify `playwright.config.js`:
```javascript
{
  workers: process.env.CI ? 4 : 8,    // More workers locally
  fullyParallel: true,                 // Run all tests in parallel
  retries: process.env.CI ? 2 : 0      // Retry failed tests in CI
}
```

### Cross-Browser Testing

The current project configuration enables Chromium, Firefox, and WebKit. Run each project independently to validate browser-specific behavior and investigate any engine-specific failures.

## Project Maintenance

### Keeping Dependencies Updated

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update Playwright specifically
npm install @playwright/test@latest
npx playwright install
```

### Regular Tasks

- **Weekly:** Run full test suite against target application
- **Monthly:** Update dependencies and review breaking changes
- **Quarterly:** Audit test coverage and identify new test scenarios
- **As Needed:** Update selectors when application UI changes

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/add-new-tests`
3. **Make** your changes following the existing code style
4. **Test** your changes: `npx playwright test`
5. **Commit** with descriptive messages: `git commit -m "Add tests for feature X"`
6. **Push** to your branch: `git push origin feature/add-new-tests`
7. **Submit** a Pull Request with detailed description of changes

### Code Style Guidelines

- Use camelCase for function and variable names
- Use PascalCase for class names
- Add descriptive comments for complex logic
- Follow existing project structure for new test files
- Ensure all tests pass before submitting PR

## FAQ

**Q: How do I run tests against a different application URL?**
A: Set the `baseURL` in `playwright.config.js` or use: `BASE_URL=your-url npx playwright test`

**Q: Can I run a single test in debug mode?**
A: Yes: `npx playwright test tests/auth/login.spec.js --debug`

**Q: How do I take screenshots during test execution?**
A: Add `await page.screenshot({ path: 'screenshot.png' })` in your test code.

**Q: What should I do if a selector breaks?**
A: Update the selector in the corresponding page class file under `pages/`

**Q: Can I run tests on a local server?**
A: Yes, configure `webServer` in `playwright.config.js` to start your local server before tests run.

## Support & Resources

- **Playwright Documentation:** https://playwright.dev
- **Playwright Test Documentation:** https://playwright.dev/docs/intro
- **Page Object Model Pattern:** https://playwright.dev/docs/pom
- **Report Issues:** Submit via GitHub Issues

## Performance Benchmarks

Expected test execution times (approximate):

- **Login Tests:** 5-10 seconds per test
- **Signup Tests:** 8-15 seconds per test
- **Cart Operations:** 10-20 seconds per test
- **Homepage Tests:** 15-30 seconds per test
- **Social Media Tests:** 5-10 seconds per test

**Full Suite (Parallel):** ~2-3 minutes | **Full Suite (Sequential):** ~8-10 minutes

## License

This project is licensed under the **ISC License** – see [package.json](package.json) for details.

## Author & Credits

**Built By:** QA Automation Engineer  
**Purpose:** Learning and automation practice for real-world UI testing workflows  
**Last Updated:** 2026-09-03

---

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Install browsers | `npx playwright install` |
| Run all tests | `npx playwright test` |
| Run headed mode | `npx playwright test --headed` |
| Run single file | `npx playwright test tests/auth/login.spec.js` |
| Debug tests | `npx playwright test --debug` |
| View report | `npx playwright show-report` |
| Run specific test | `npx playwright test -g "test name"` |

---

**For detailed setup instructions or additional help, please refer to the sections above or consult the Playwright documentation.**
