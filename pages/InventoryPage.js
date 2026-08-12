class InventoryPage
{
    constructor (page)
    {
        this.page = page;
        this.title = page.locator ('[data-test="title"]');
        this.shoppingCartLink = page.locator ('[data-test="shopping-cart-link"]');
        this.inventoryContainer = page.locator ('[data-test="inventory-container"]');
        this.inventoryProductsButton = page.locator ('.btn_inventory');
    }

    async addItemToCart(itemName)
    {
        const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
        await item.locator('.btn_inventory').click();
    }

    async openCart()
    {
        await this.shoppingCartLink.click();
    }

    async getPageTitle()
    {
        return await this.title.textContent();
    }

    async sortByPriceHighToLow() {
        await this.page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    }

    async getFirstItemName() {
        return await this.page.locator('.inventory_item_name').first().textContent();
    }
}

module.exports = InventoryPage;  