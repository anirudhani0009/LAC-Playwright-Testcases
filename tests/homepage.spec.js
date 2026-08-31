const { test, expect } = require("@playwright/test");
const Login = require("../pages/loginpage.js");
const Home = require("../pages/homepage.js");
const LoginData = JSON.parse(JSON.stringify(require("../assets/lac-loginCred.json")));

test.describe("LAC Homepage", () => {
    let login;
    let home;

    test.beforeEach(async ({ page }) => {
        // Create the page objects before each test.
        login = new Login(page);
        home = new Home(page);

        // Navigate to the login page and verify the page is displayed.
        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({ timeout: 3000 });
        await login.signinToApplication(LoginData.username, LoginData.password);
        await expect(page.locator(login.signinButton)).not.toBeVisible();
        await expect(home.cart).toBeVisible({timeout: 3000 });
        await expect(home.manageButton).toBeVisible({ timeout: 3000 });
        await expect(home.breadCrumbsBtn).toBeVisible({ timeout:3000 });
    });

    test("Adding and removing all 5 items in and out of the cart", async ({ page }) => {
        // adding all the items to the cart and verifying
        await home.addCourses(home.coursesAll);
        await expect(home.cartCountLocator).toContainText(Object.keys(home.courses).length.toString());

        for (const course of home.coursesAll) {
            const removeButton = home.getRemoveButton(course);
            await expect(removeButton).toBeVisible();
        }

        // Removing all the items to the cart and verifying
        await home.removeCourses(home.coursesAll);
        await expect(home.cartCountLocator).not.toBeVisible();
        for (const course of home.coursesAll) {
            const addButton = home.getAddtocartButton(course);
            await expect(addButton).toBeVisible();
        }

    });

    test("Adding and removing all the selected 3 items in and out of the cart", async ({ page }) => {
        // adding all the selected items stored in coursesToBuy array to the cart and verifying
        await home.addCourses(home.coursesToBuy);
        await expect(home.cartCountLocator).toContainText("3");

        for (const course of home.coursesToBuy) {
            const removeButton = home.getRemoveButton(course);
            await expect(removeButton).toBeVisible();
        }


        // Removing all the selected items stored in coursesToBuy array to the cart and verifying
        await home.removeCourses(home.coursesToBuy);
        await expect(home.cartCountLocator).not.toBeVisible();
        for (const course of home.coursesToBuy) {
            const addButton = home.getAddtocartButton(course);
            await expect(addButton).toBeVisible();
        }
    });



    test("Adding and removing items one by one", async ({ page }) => {

        for (const course of home.coursesAll) {
            // adding the item to the cart and verifying
            await home.addCourses(course);
            await expect(home.cartCountLocator).toContainText("1");

            const removeButton = home.getRemoveButton(course);
            await expect(removeButton).toBeVisible();

            // Removing item from the cart and verifying
            await home.removeCourses(course);
            await expect(home.cartCountLocator).not.toBeVisible();

            const addButton = home.getAddtocartButton(course);
            await expect(addButton).toBeVisible();
        }

    });

    
    test("Testing Sidebar and contents", async ({ page }) => {

        await home.breadCrumbsBtn.click();
        await expect(home.homeOption).toBeVisible({timeout:3000});
        await expect(home.practiseOption).toBeVisible({timeout:3000});
        await expect(home.signOutOption).toBeVisible({timeout:3000});

    });


});