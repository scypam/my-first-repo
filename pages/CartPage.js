class CartPage
{
    constructor (page) {
        this.page = page;
        this.cartList = page.locator('[data-test="cart-list"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async checkCartList(itemName) {
        const item = this.page.locator('.cart_item').filter({hasText: itemName});
        return item.isVisible();
    }
}

module.exports = CartPage; 