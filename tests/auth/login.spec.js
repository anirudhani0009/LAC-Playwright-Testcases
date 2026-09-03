const { test, expect } = require("../../fixtures/loginFixture.js");
const Home = require("../../pages/homepage.js");
const LoginData = require("../../assets/lac-loginCred.json");

// Test suite: Validates login page authentication and error handling
// Covers: valid login flow, invalid credentials, empty field validation, and error messages
test.describe("LAC Login Page - Positive cases", () => {

    test("Sign in with correct credentials", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters valid email and password from test data
        // EXPECTED: Login succeeds and user is redirected to the homepage
        const home = new Home(page);

        // Submit valid credentials for successful authentication
        await login.signinToApplication(LoginData.username, LoginData.password);

        // Verify successful login: sign-in button should NOT be visible (no longer on login page)
        await expect(page.locator(login.signinButton)).not.toBeVisible();

        // Verify homepage loaded correctly by checking for homepage-only elements
        await expect(home.manageButton).toBeVisible({ timeout: 5000 });
    });

    test("Sign in with correct credentials using the Enter key", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters valid email and password from test data and press enter
        // EXPECTED: Login succeeds and user is redirected to the homepage
        const home = new Home(page);

        // Submit valid credentials for successful authentication
        await login.signinToApplicationWithEnter(LoginData.username, LoginData.password);

        // Verify successful login: sign-in button should NOT be visible (no longer on login page)
        await expect(page.locator(login.signinButton)).not.toBeVisible();
        // Verify homepage loaded correctly by checking for homepage-only elements
        await expect(home.manageButton).toBeVisible({ timeout: 5000 });
    });

    test("Check if the password is masked", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters login page
        // EXPECTED: Password input should be masked
        await expect(page.locator(login.password)).toHaveAttribute("type", "password");
    });
});

test.describe("LAC Login Page - Nagative cases", () => {
    test("Sign in with Incorrect password", async ({ page, goToLogin: { login } }) => {
        /*
        Error Message Keys:
                general: "Email and Password Doesn't match",
                wrongemail:"USER Email Doesn't Exist",
                wrongEmail: "USER Email Doesn't Exist",
                allEmpty: "Email and Password is required",
                emptyEmail: "Email is required",
                emptyPassword: "Password is required"
        */
        // Use a valid email but wrong password and verify the error is shown.
        await login.signinToApplication(LoginData.username, LoginData.fakepassword);
        await expect(page.locator(login.signinButton)).toBeVisible();

        // Verify correct error message displays for password mismatch
        await expect(login.getErrorLocator('general')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in with Incorrect email", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters non-existent email address with valid password
        // EXPECTED: Login fails and error message "USER Email Doesn't Exist" displays

        // Attempt login with fake/non-existent email
        await login.signinToApplication(LoginData.fakeusername, LoginData.password);

        // Verify login failed: still on login page
        await expect(page.locator(login.signinButton)).toBeVisible();

        // Verify error message for non-existent email
        await expect(login.getErrorLocator('wrongemail')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in with Incorrect email format 1 (user)", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters Incorrect email format (user) with valid password
        // EXPECTED: Login fails and error message "Please include an '@' in the email address. 'user' is missing an '@'." from validation message

        // Attempt login with incorrect email
        await login.signinToApplication(LoginData.nonusername1, LoginData.password);

        // Verify login failed: still on login page
        await expect(page.locator(login.signinButton)).toBeVisible();

        //Test the browser’s validation state: as messages will differ from browser to browser
        await expect(page.locator(login.email)).toHaveJSProperty("validity.typeMismatch", true);
    });

    test("Sign in with Incorrect email format 2 - (user.example.com)", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters Incorrect email format with valid password
        // EXPECTED: Login fails and error message "Please include an '@' in the email address. 'user.example.com' is missing an '@'." from validation message

        // Attempt login with incorrect email
        await login.signinToApplication(LoginData.nonusername2, LoginData.password);

        // Verify login failed: still on login page
        await expect(page.locator(login.signinButton)).toBeVisible();

        //Test the browser’s validation state: as messages will differ from browser to browser
        await expect(page.locator(login.email)).toHaveJSProperty("validity.typeMismatch", true);
    });

    test("Sign in with Incomplete email - (user@)", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters Incomplete email format with valid password
        // EXPECTED: Login fails and error message "Please enter a part following '@'. '${LoginData.incompleteusername}' is incomplete." from validation message

        // Attempt login with Incomplete email
        await login.signinToApplication(LoginData.incompleteusername, LoginData.password);

        // Verify login failed: still on login page
        await expect(page.locator(login.signinButton)).toBeVisible();

        //Test the browser’s validation state: as messages will differ from browser to browser
        await expect(page.locator(login.email)).toHaveJSProperty("validity.typeMismatch", true);
    });

    test("Sign in with Incorrect username and password", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters both invalid email and password
        // EXPECTED: Login fails with email error (email validation runs first)

        // Attempt login with both incorrect credentials
        await login.signinToApplication(LoginData.fakeusername, LoginData.fakepassword);

        // Verify login failed: still on login page
        await expect(page.locator(login.signinButton)).toBeVisible();

        // Verify email error displays (email validation has priority over password)
        await expect(login.getErrorLocator('wrongemail')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in without username and password", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User clicks sign-in button with both email and password fields empty
        // EXPECTED: Form validation fails with error "Email and Password is required"

        // Submit form with completely empty fields
        await login.signinToApplication("", "");

        // Verify login failed: still on login page
        await expect(page.locator(login.signinButton)).toBeVisible();

        // Verify validation error for both empty required fields
        await expect(login.getErrorLocator('allEmpty')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in with username and password as whitespace", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User clicks sign-in button with both email and password fields empty
        // EXPECTED: Form validation fails with error "Email and Password is required"

        // Submit form with blank space fields
        await login.signinToApplication(" ", " ");

        // Verify login failed: still on login page
        await expect(page.locator(login.signinButton)).toBeVisible();

        // Verify Email is requred message - Password is one character blank space
        await expect(login.getErrorLocator('emptyEmail')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in without email", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters password but leaves email field empty
        // EXPECTED: Form validation fails with error "Email is required"

        // Submit form with empty email but valid password
        await login.signinToApplication("", LoginData.password);

        // Verify login failed: still on login page
        await expect(page.locator(login.signinButton)).toBeVisible();

        // Verify email required validation error
        await expect(login.getErrorLocator('emptyEmail')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in without password", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters email but leaves password field empty
        // EXPECTED: Form validation fails with error "Password is required"

        // Submit form with valid email but empty password
        await login.signinToApplication(LoginData.username, "");

        // Verify login failed: still on login page
        await expect(page.locator(login.signinButton)).toBeVisible();

        // Verify password required validation error
        await expect(login.getErrorLocator('emptyPassword')).toBeVisible({ timeout: 5000 });
    });

    test("Remains logged out after repeated failed attempts", async ({ page, goToLogin: { login } }) => {
        // SCENARIO: User enters fake emailand password and repeatadly tries to login.
        // EXPECTED: Form validation fails with error "email doesn't exist"
        for (let attempt = 0; attempt < 3; attempt++) {
            await login.signinToApplication(LoginData.fakeusername, LoginData.fakepassword);
        }

        // Verify login failed: still on login page
        await expect(page.locator(login.signinButton)).toBeVisible();
        // Verify password required validation error
        await expect(login.getErrorLocator("wrongemail")).toBeVisible();
    });
});