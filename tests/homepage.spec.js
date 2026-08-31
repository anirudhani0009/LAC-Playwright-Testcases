const { test, expect } = require("../fixtures/auth.js");

test.describe("LAC Homepage", () => {
    test("Adding and removing all 5 items in and out of the cart", async ({ auth }) => {
        const { home } = auth;

        await home.addCourses(home.coursesAll);
        await expect(home.cartCountLocator).toContainText(Object.keys(home.courses).length.toString());

        for (const course of home.coursesAll) {
            const removeButton = home.getRemoveButton(course);
            await expect(removeButton).toBeVisible();
        }

        await home.removeCourses(home.coursesAll);
        await expect(home.cartCountLocator).not.toBeVisible();
        for (const course of home.coursesAll) {
            const addButton = home.getAddtocartButton(course);
            await expect(addButton).toBeVisible();
        }
    });

    test("Adding and removing all the selected 3 items in and out of the cart", async ({ auth }) => {
        const { home } = auth;

        await home.addCourses(home.coursesToBuy);
        await expect(home.cartCountLocator).toContainText("3");

        for (const course of home.coursesToBuy) {
            const removeButton = home.getRemoveButton(course);
            await expect(removeButton).toBeVisible();
        }

        await home.removeCourses(home.coursesToBuy);
        await expect(home.cartCountLocator).not.toBeVisible();
        for (const course of home.coursesToBuy) {
            const addButton = home.getAddtocartButton(course);
            await expect(addButton).toBeVisible();
        }
    });

    test("Adding and removing items one by one", async ({ auth }) => {
        const { home } = auth;

        for (const course of home.coursesAll) {
            await home.addCourses(course);
            await expect(home.cartCountLocator).toContainText("1");

            const removeButton = home.getRemoveButton(course);
            await expect(removeButton).toBeVisible();

            await home.removeCourses(course);
            await expect(home.cartCountLocator).not.toBeVisible();

            const addButton = home.getAddtocartButton(course);
            await expect(addButton).toBeVisible();
        }
    });

    test("Testing Sidebar and contents", async ({ auth }) => {
        const { home } = auth;

        await home.breadCrumbsBtn.click();
        await expect(home.homeOption).toBeVisible({ timeout: 3000 });
        await expect(home.practiseOption).toBeVisible({ timeout: 3000 });
        await expect(home.signOutOption).toBeVisible({ timeout: 3000 });
    });
});