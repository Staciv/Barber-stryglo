import { expect, test } from "@playwright/test";

test("happy path booking flow", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Сегодня" }).click();
  await page.getByRole("button", { name: "Выбрать время 12:00" }).click();
  await page.getByRole("button", { name: "Выбрать барбера Любой" }).click();
  await page.getByRole("button", { name: "Выбрать услугу Стрижка", exact: true }).click();
  await page.getByLabel("Имя").fill("Илья");
  await page.getByLabel("Телефон").fill("+375291234567");
  await page.getByRole("button", { name: "Подтвердить запись" }).click();

  await expect(page.getByRole("heading", { name: "Ты записан" })).toBeVisible();
  await expect(page.getByText("Илья")).toBeVisible();
});

test("haircut recommendation flows into booking", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Подобрать стрижку/i }).click();
  await page.getByRole("button", { name: "Выбрать стиль Fade Reset" }).click();
  await page.getByRole("button", { name: "Продолжить с этим стилем" }).click();

  await expect(page.getByRole("heading", { name: "Когда тебе удобно?" })).toBeVisible();
});

test("voice booking mock flow prefills the booking", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Голосовая запись" }).click();

  await expect(page.getByText("Понял: завтра, вечер, стрижка")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Кто стрижет?" })).toBeVisible();
});

test("validation errors appear when required fields are empty", async ({ page }) => {
  await page.goto("/booking");
  await page.getByRole("button", { name: "Сегодня" }).click();
  await page.getByRole("button", { name: "Выбрать время 12:00" }).click();
  await page.getByRole("button", { name: "Выбрать барбера Любой" }).click();
  await page.getByRole("button", { name: "Выбрать услугу Стрижка", exact: true }).click();
  await page.getByRole("button", { name: "Подтвердить запись" }).click();

  await expect(page.getByText("Введите имя")).toBeVisible();
  await expect(page.getByText("Введите телефон")).toBeVisible();
});

test("custom date opens a calendar and continues the flow", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Выбрать дату" }).click();

  const dateInput = page.getByLabel("Выбери дату");
  await expect(dateInput).toBeVisible();
  await dateInput.fill("2026-03-20");

  await expect(page.getByRole("heading", { name: "Выбери слот" })).toBeVisible();
});
