const { test, expect } = require("../fixtures/auth.js");

test.describe("LAC Homepage", () => {
    test("Adding and removing all items from JSON in and out of the cart", async ({ auth: {home} }) => {
        // Add every course defined in the JSON data and verify each card changes state.
        await home.addCourses(home.coursesAll);
        await expect(home.cartCountLocator).toContainText(Object.keys(home.courses).length.toString());

        for (const course of home.coursesAll) {
            const removeButton = home.getRemoveButton(course);
            await expect(removeButton).toBeVisible();
        }

        // Remove the same courses and confirm the cart and buttons return to their initial state.
        await home.removeCourses(home.coursesAll);
        await expect(home.cartCountLocator).not.toBeVisible();
        for (const course of home.coursesAll) {
            const addButton = home.getAddtocartButton(course);
            await expect(addButton).toBeVisible();
        }
    });

    test("Adding and removing all the selected items in and out of the cart", async ({ auth: {home} }) => {

        // Repeat the full cart workflow with the smaller data-driven selection.
        await home.addCourses(home.coursesToBuy);
        const coursesToBuyCount = home.coursesToBuy.length;
        await expect(home.cartCountLocator).toContainText(coursesToBuyCount.toString());

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

    test("Adding and removing items one by one", async ({ auth: {home} }) => {

        // Verify that adding and removing a single course works independently for every course.
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

    test("Testing Sidebar and contents", async ({ auth: {home} }) => {
        // Open the sidebar and verify that all expected navigation actions are available.
        await home.breadCrumbsBtn.click();
        await expect(home.homeOption).toBeVisible({ timeout: 3000 });
        await expect(home.practiseOption).toBeVisible({ timeout: 3000 });
        await expect(home.signOutOption).toBeVisible({ timeout: 3000 });
    });
});