# Coverage Matrix

Current configured scope: **35 tests across 5 files, three browser projects**.

| Area | User risk | Automated coverage | Test file | Status |
| --- | --- | --- | --- | --- |
| Login success | Valid users cannot sign in | Password login and Enter-key submission | `tests/auth/login.spec.js` | Covered |
| Login validation | Invalid input is accepted or poorly reported | Invalid credentials, empty fields, whitespace, and invalid email formats | `tests/auth/login.spec.js` | Covered |
| Password security | Password is visible while entering it | Password input type is verified | `tests/auth/login.spec.js` | Covered |
| Signup form | Required registration data is not enforced | Name, email, password, interests, state, and hobbies requirements | `tests/auth/signup.spec.js` | Covered |
| Signup lifecycle | New users cannot register | Intentionally not submitted against the external application | `tests/auth/signup.spec.js` | Out of scope |
| Course cart | Items cannot be added or removed | All-course, selected-course, and one-at-a-time add/remove flows | `tests/homepage.spec.js` | Covered |
| Cart totals | Customer is shown an incorrect total | Individual prices are summed and compared with displayed totals | `tests/cartpage.spec.js` | Covered |
| Empty cart | Removing all items leaves stale state | Price reaches zero and Shop Now returns to the homepage | `tests/cartpage.spec.js` | Covered |
| Enrollment | Valid enrollment cannot complete | Modal fields, order ID format, and post-order cart clearing | `tests/cartpage.spec.js` | Covered |
| Enrollment cancellation | Cancellation loses cart state | Modal cancellation and retained cart total | `tests/cartpage.spec.js` | Covered |
| Navigation | Authenticated users cannot use the menu | Sidebar options are visible after opening the menu | `tests/homepage.spec.js` | Covered |
| External links | Social buttons open incorrect destinations | New-tab URL checks for four social platforms | `tests/socialMedia.spec.js` | Covered |
| Accessibility | Keyboard/screen-reader users encounter barriers | No automated accessibility audit currently included | N/A | Planned |
| Responsive UI | Mobile users see broken layout | No mobile project currently enabled | N/A | Planned |
| Cross-browser | Behavior differs by browser engine | Chromium, Firefox, and WebKit projects are enabled | `playwright.config.js` | Configured |

## Coverage Interpretation

This matrix describes tested behavior, not product completeness. “Covered” means the suite contains an executable check for the stated risk. It does not imply exhaustive boundary, compatibility, or non-functional testing. “Configured” means the browser project is enabled; the suite should be executed in each browser before claiming cross-browser pass results.
