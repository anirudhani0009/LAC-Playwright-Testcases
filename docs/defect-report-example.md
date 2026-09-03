# Defect Report Example

> This is an illustrative report format for the portfolio. It is not a claim that this defect currently exists in the target application.

## Summary

Cart total does not update after removing the final course.

## Metadata

| Field | Value |
| --- | --- |
| ID | LAC-CART-001 |
| Severity | High |
| Priority | P1 |
| Area | Shopping cart |
| Environment | Practice app, Chromium, desktop viewport |
| Reported by | QA Automation |
| Status | New |

## Preconditions

- User is authenticated.
- At least one course is present in the cart.

## Steps to Reproduce

1. Open the authenticated homepage.
2. Add one course to the cart.
3. Open the cart.
4. Note the displayed total.
5. Remove the final course.

## Expected Result

The cart shows an empty state, the item count is cleared, and the displayed total is `0`.

## Actual Result

The final course is removed, but the displayed total still shows the previous amount.

## Evidence

Attach the Playwright HTML report, screenshot, trace, or video from the failed run. Include the test name, browser project, environment URL, and commit SHA used for reproduction.

## Technical Notes

A regression test should verify the total after the final removal and remain independent of the order of courses in the cart.
