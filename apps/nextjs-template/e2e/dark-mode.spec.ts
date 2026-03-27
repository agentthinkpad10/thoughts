import { test, expect } from "@playwright/test";

test.describe("Dark mode toggle", () => {
  test("page loads with heading visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("switching to dark mode applies .dark class to html", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Toggle theme").click();
    await page.getByRole("menuitem", { name: "Dark" }).click();

    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("switching to light mode removes .dark class from html", async ({ page }) => {
    await page.goto("/");

    // Set dark first
    await page.getByLabel("Toggle theme").click();
    await page.getByRole("menuitem", { name: "Dark" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Switch to light
    await page.getByLabel("Toggle theme").click();
    await page.getByRole("menuitem", { name: "Light" }).click();

    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});
