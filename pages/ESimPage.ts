import { expect, Locator, Page } from "@playwright/test";

export class ESimPage {
    readonly cartPrice: Locator;

    constructor(private page: Page) {
        this.cartPrice = page.getByTestId("cart-navigation_container").getByTestId("price_amount");
    }

    async open() {
        await this.page.goto("/");
    }

    async selectTab(tabName: string) {
        await this.page.getByRole("tab", { name: new RegExp(tabName, "i") }).click();
    }

    async selectPlan(planName: string) {
        await this.page.getByRole("button", { name: new RegExp(planName, "i") }).click();
    }

    async getPackagePrice(planName: string) {
        return this.page.getByRole("button", { name: new RegExp(planName, "i") }).getByTestId("price_amount").innerText();
    }

    async expectCartPriceToBe(price: string) {
        await expect(this.cartPrice).toHaveText(price);
    }
}
