const {test, expect} = require("@playwright/test");

test.describe('Авторизация на Sauce Demo @ui', () => {
    test ("Проверка успешного входа в систему", async ({page}) => {
        await page.goto("https://www.saucedemo.com/");
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill("secret_sauce");
        await page.locator("#login-button").click();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });


    test("Проверка неуспешного входа в систему заблокированным пользователем", async ({page}) => {
        await page.goto("https://www.saucedemo.com/");
        await page.locator("#user-name").fill("locked_out_user");
        await page.locator("#password").fill("secret_sauce");
        await page.locator("#login-button").click();
        await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Sorry, this user has been locked out.");
    });
});