const { test, expect } = require("@playwright/test");
const Login = require("../../pages/loginpage.js");
const Home = require("../../pages/homepage.js");
const LoginData = JSON.parse(JSON.stringify(require("../../assets/lac-loginCred.json")));

test.describe("LAC Login Page", () => {
    let login;
    let home;

    test.beforeEach(async ({ page }) => {
        login = new Login(page);
        home = new Home(page);

        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({timeout: 3000});
    });

    test("Sign in with correct credentials", async ({ page }) => {
        await login.signinToApplication(LoginData.username, LoginData.password);
        await expect(page.locator(login.signinButton)).not.toBeVisible();
        await expect(page.locator(home.manageButton)).toBeVisible({ timeout: 5000 });
    });
    test("Sign in with Incorrect password", async ({ page }) => {
        await login.signinToApplication(LoginData.username, LoginData.fakepassword);
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('general')).toBeVisible({ timeout: 5000 });
    });
        test("Sign in with Incorrect email", async ({ page }) => {
        await login.signinToApplication(LoginData.fakeusername, LoginData.password);
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('wrongemail')).toBeVisible({ timeout: 5000 });
    });
        test("Sign in with Incorrect username and password", async ({ page }) => {
        await login.signinToApplication(LoginData.fakeusername, LoginData.fakepassword);
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('wrongemail')).toBeVisible({ timeout: 5000 });
    });
        test("Sign in without username and password", async ({ page }) => {
        await login.signinToApplication("", "");
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('allEmpty')).toBeVisible({ timeout: 5000 });
    });
        test("Sign in without email", async ({ page }) => {
        await login.signinToApplication("", LoginData.password);
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('emptyEmail')).toBeVisible({ timeout: 5000 });
    });
    test("Sign in without password", async ({ page }) => {
        await login.signinToApplication(LoginData.username, "");
        await expect(page.locator(login.signinButton)).toBeVisible();
        await expect(login.getErrorLocator('emptyPassword')).toBeVisible({ timeout: 5000 });
    });
});

