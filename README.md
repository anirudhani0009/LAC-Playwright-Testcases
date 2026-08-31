# LAC Playwright Automation

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-%23E5E5E5?style=for-the-badge&logo=playwright&logoColor=45ba4b" alt="Playwright" />
  <img src="https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Browser-Chromium-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Chromium" />
</p>

A professional end-to-end test automation suite for the LAC web application, built with Playwright and JavaScript. This project validates authentication, homepage interactions, cart functionality, and social media navigation flows using a clean Page Object Model (POM) structure.

## Overview

This repository contains automated UI tests for the LAC platform, covering the most critical user journeys:

- Login flow and validation errors
- Signup form validation
- Homepage course interactions
- Cart behavior and checkout flow
- Social media link navigation

## Tech Stack

- Playwright Test
- JavaScript (CommonJS)
- Page Object Model pattern
- HTML report generation

## Project Structure

```text
LAC-Playwright/
├── assets/
│   ├── lac-courses.json
│   └── lac-loginCred.json
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
├── playwright.config.js
├── package.json
├── .gitignore
└── README.md
```

## Test Coverage

### Authentication
- Valid login attempt
- Incorrect password handling
- Incorrect email handling
- Empty form validation
- Missing email/password validation

### Registration
- Successful signup flow
- Required field validation
- Interest checkbox verification
- State selection validation
- Hobbies validation
- Login link from signup page

### Homepage
- Add and remove items from cart
- Add/remove selected courses
- Add/remove each course individually
- Sidebar and navigation checks

### Cart
- Item and price validation
- Continue/cancel order scenarios
- Remove items and verify totals

### Social Media
- YouTube link opens in a new tab
- Twitter link opens in a new tab
- LinkedIn link opens in a new tab
- Facebook link opens in a new tab

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Install Browser Dependencies

```bash
npx playwright install
```

### Run All Tests

```bash
npx playwright test
```

### Run a Specific Test File

```bash
npx playwright test tests/auth/login.spec.js
```

### Open HTML Report

```bash
npx playwright show-report
```

## Configuration

The project is configured in [playwright.config.js](playwright.config.js) and currently targets the Chromium browser project with HTML reporting enabled.

## Notes

- Test data is stored in the [assets](assets) folder.
- Page actions and selectors are centralized in the [pages](pages) folder to keep the tests readable and maintainable.
- The project follows a structured Page Object Model rather than placing all selectors directly in test files.

## License

This project is licensed under the ISC license.

---

Built for reliable UI regression testing and continuous quality assurance.
