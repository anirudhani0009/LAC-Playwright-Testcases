const { test, expect } = require("../fixtures/auth.js");

// Test suite: Validates homepage course management and shopping cart functionality
// Covers: add/remove all courses, add/remove selected courses, individual operations, sidebar navigation
test.describe("LAC Homepage", () => {
    
    test("Adding and removing all items from JSON in and out of the cart", async ({ auth: {home} }) => {
        // SCENARIO: User adds ALL available courses to cart, then removes them all
        // EXPECTED: Cart updates correctly, add/remove buttons change state appropriately
        
        // Add every course from test data and verify cart count
        await home.addCourses(home.coursesAll);
        await expect(home.cartCountLocator).toContainText(Object.keys(home.courses).length.toString());

        // Verify all courses now show "Remove" buttons (indicating they're in cart)
        for (const course of home.coursesAll) {
            const removeButton = home.getRemoveButton(course);
            await expect(removeButton).toBeVisible();
        }

        // Remove all courses from cart and verify cart becomes empty
        await home.removeCourses(home.coursesAll);
        await expect(home.cartCountLocator).not.toBeVisible();
        
        // Verify all courses now show "Add to Cart" buttons (indicating they're not in cart)
        for (const course of home.coursesAll) {
            const addButton = home.getAddtocartButton(course);
            await expect(addButton).toBeVisible();
        }
    });

    test("Adding and removing all the selected items in and out of the cart", async ({ auth: {home} }) => {
        // SCENARIO: User adds only SELECTED courses to cart (subset of all courses), then removes them
        // EXPECTED: Only selected courses are affected, cart count updates correctly
        
        // Add only courses from the "coursesToBuy" subset
        await home.addCourses(home.coursesToBuy);
        const coursesToBuyCount = home.coursesToBuy.length;
        await expect(home.cartCountLocator).toContainText(coursesToBuyCount.toString());

        // Verify selected courses show "Remove" buttons
        for (const course of home.coursesToBuy) {
            const removeButton = home.getRemoveButton(course);
            await expect(removeButton).toBeVisible();
        }

        // Remove all selected courses and verify cart is empty
        await home.removeCourses(home.coursesToBuy);
        await expect(home.cartCountLocator).not.toBeVisible();
        
        // Verify selected courses now show "Add to Cart" buttons
        for (const course of home.coursesToBuy) {
            const addButton = home.getAddtocartButton(course);
            await expect(addButton).toBeVisible();
        }
    });

    test("Adding and removing items one by one", async ({ auth: {home} }) => {
        // SCENARIO: User adds and removes each course individually (one at a time)
        // EXPECTED: Cart count and button states update correctly for each operation
        
        // For each course: add it, verify count is 1, verify remove button visible
        // Then remove it, verify count is empty, verify add button visible
        for (const course of home.coursesAll) {
            // Add single course
            await home.addCourses(course);
            await expect(home.cartCountLocator).toContainText("1");

            // Verify remove button appears (course is in cart)
            const removeButton = home.getRemoveButton(course);
            await expect(removeButton).toBeVisible();

            // Remove the single course
            await home.removeCourses(course);
            await expect(home.cartCountLocator).not.toBeVisible();

            // Verify add button appears (course is no longer in cart)
            const addButton = home.getAddtocartButton(course);
            await expect(addButton).toBeVisible();
        }
    });

    test("Testing Sidebar and contents", async ({ auth: {home} }) => {
        // SCENARIO: User opens sidebar navigation menu
        // EXPECTED: All navigation options are visible and accessible
        
        // Click breadcrumbs button to open sidebar navigation
        await home.breadCrumbsBtn.click();
        
        // Verify all sidebar navigation options are visible
        await expect(home.homeOption).toBeVisible({ timeout: 3000 });
        await expect(home.practiseOption).toBeVisible({ timeout: 3000 });
        await expect(home.signOutOption).toBeVisible({ timeout: 3000 });
    });
});