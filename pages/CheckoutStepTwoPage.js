const { expect } = require('@playwright/test'); 

class CheckoutStepTwoPage
{
    constructor (page) {
        this.page = page;
        this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
        this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
        this.totalInfoLabel = page.locator('[data-test="total-info-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async finishCheckout() {
        await expect(this.paymentInfoLabel).toBeVisible();
        await expect(this.shippingInfoLabel).toBeVisible();
        await expect(this.totalLabel).toBeVisible();
        await this.finishButton.click();
    }
}

module.exports = CheckoutStepTwoPage;