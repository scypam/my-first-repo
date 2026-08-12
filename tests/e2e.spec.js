const {test, expect} = require ('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');

test ('Сценарий покупки товара', async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    expect(await inventoryPage.getPageTitle()).toBe('Products');
    await inventoryPage.sortByPriceHighToLow();
    const itemName = await inventoryPage.getFirstItemName();
    await inventoryPage.addItemToCart(itemName);
    await inventoryPage.openCart();

    expect(await cartPage.checkCartList(itemName)).toBe(true);
    await cartPage.goToCheckout();

    await checkoutStepOnePage.fillUserInfo("Test", "User", "12345");

    await checkoutStepTwoPage.finishCheckout();

    expect(await checkoutCompletePage.getCompletionMessage()).toBe('Thank you for your order!');
});