const { expect } = require("@playwright/test");
const courseData = require("../assets//lac-courses.json");

// Page object model for the home page after login.
// Encapsulates selectors and page-specific helpers for assertions.
class HomePage {

    constructor(page) {
        // Store the Playwright page instance for later use.
        this.page = page;
        // Locator for the Manage button shown on the logged-in homepage.
        this.manageButton = page.locator("span", { hasText: "Manage" });
        this.cart = page.locator("button.cartBtn", { hasText: "Cart" });
        this.breadCrumbsBtn = page.getByRole('img', { name: 'menu', excact: true});
        this.homeOption = page.getByRole('link', {name: 'Home', excact: true});
        this.practiseOption = page.getByRole('link', {name: 'Practise', excact: true});
        this.signOutOption = page.getByRole('button', { name: 'Sign out', exact: true });
        //Assign the imported JSON object to instance variable
        this.courses = courseData;
        this.allAddtoCartButtons = page.locator('.course-card').getByRole('button', { name: 'Add to Cart' });
        this.coursesAll = Object.values(this.courses);
        //this.coursesToBuy = [this.courses.course1, this.courses.course2];
        this.coursesToBuy = this.getCourses(this.coursesAll);
        this.cartCountLocator = page.locator('span.count');
    }

    getAddtocartButton(courseName) {
        return this.page.locator('.course-card',
            {
                // Targets only the h2 with class 'name' for the exact text match
                has: this.page.locator('h2.name',
                    {
                        hasText: new RegExp(`^${courseName}$`)
                    })
            })
            .getByRole('button', { hasText: 'Add to Cart' });
    }

    getRemoveButton(courseName) {
        return this.page.locator('.course-card', {
            // Targets only the h2 with class 'name' for the exact text match
            has: this.page.locator('h2.name',
                {
                    hasText: new RegExp(`^${courseName}$`)
                })
        })
            .getByRole('button', { hasText: 'Remove from Cart' });
    }


    async addCourses(courses) {
        await this.allAddtoCartButtons.first().waitFor({ state: 'visible' });
        const courseList = Array.isArray(courses) ? courses : [courses];
        for (const course of courseList) {
            const button = this.getAddtocartButton(course);
            await button.click();
        }
    }


    async removeCourses(courses) {
        const courseList = Array.isArray(courses) ? courses : [courses];
        for (const course of courseList) {
            const button = this.getRemoveButton(course);
            await button.click();
        }
    }

    async breadCrumbsBtnClick(){
        await this.breadCrumbsBtn.click();
    }


    async goTocart(){
        await this.cart.click();
    }

    getCourses(courses){
        let newCourse = [];
        for(let i=0; i<courses.length; i++ ){
            if(i===1)
                return newCourse;
            else
                newCourse[i] = courses[i];
        }
        return newCourse;
    }

}
module.exports = HomePage;