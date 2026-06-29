import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly searchInput: Locator;

    constructor(private page: Page) {
        this.searchInput = page.getByTestId("search-input_text-field");
    }

    async open() {
        await this.page.goto("/", { waitUntil: "domcontentloaded" });
    }

    async searchLocation(location: string) {
        await this.searchInput.fill(location);
    }

    async selectLocation(location: string) {
        await this.page.getByRole("link", { name: new RegExp(location, "i") }).click();
    }
}