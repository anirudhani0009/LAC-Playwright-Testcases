const { test, expect } = require("@playwright/test");
const Login = require("../../pages/loginpage.js");
const Home = require("../../pages/homepage.js");
const LoginData = JSON.parse(JSON.stringify(require("../../assets/lac-loginCred.json")));

// Test suite for the login page and its validation behavior.
test.describe("LAC Login Page for Authentication", () => {
    let login;
    let home;

    test.beforeEach(async ({ page }) => {
        // Create the page objects before each test.
        login = new Login(page);
        home = new Home(page);

        // Navigate to the login page and verify the page is displayed.
        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({timeout: 3000});
    });

    test("Sign in with correct credentials", async ({ page }) => {
        // Submit valid credentials and confirm the login succeeds.
        await login.signinToApplication(LoginData.username, LoginData.password);
        await expect(page.locator(login.signinButton)).not.toBeVisible();
        await expect(page.locator(home.manageButton)).toBeVisible({ timeout: 5000 });
    });

    test("Sign in with Incorrect password", async ({ page }) => {
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
        await expect(login.getErrorLocator('general')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in with Incorrect email", async ({ page }) => {
        // Use an invalid email and valid password.
        await login.signinToApplication(LoginData.fakeusername, LoginData.password);
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('wrongemail')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in with Incorrect username and password", async ({ page }) => {
        // Use invalid credentials for both email and password.
        await login.signinToApplication(LoginData.fakeusername, LoginData.fakepassword);
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('wrongemail')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in without username and password", async ({ page }) => {
        // Submit an empty form and verify the required field error.
        await login.signinToApplication("", "");
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('allEmpty')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in without email", async ({ page }) => {
        // Leave the email field empty and verify the corresponding validation error.
        await login.signinToApplication("", LoginData.password);
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('emptyEmail')).toBeVisible({ timeout: 5000 });
    });

    test("Sign in without password", async ({ page }) => {
        // Leave the password field empty and verify the corresponding validation error.
        await login.signinToApplication(LoginData.username, "");
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('emptyPassword')).toBeVisible({ timeout: 5000 });
    });
});