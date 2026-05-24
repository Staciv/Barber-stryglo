import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
  });
});

test("home page loads with booking CTA and STRIGLO branding", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Запись к барберу/ })).toBeVisible();
  await expect(page.getByText("STRIGLO").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Записаться" })).toHaveAttribute("href", "/booking");
});

test("booking mock flow creates a confirmed appointment", async ({ page }) => {
  await page.goto("/booking");

  await page.getByRole("button", { name: /Выбрать слот/ }).first().click();

  const barberButtons = page.getByRole("button", { name: /Свободен/ });
  if ((await barberButtons.count()) > 0) {
    await barberButtons.first().click();
  }

  await page.getByRole("button", { name: "Продолжить" }).click();
  await page.locator("#booking-name").fill("QA Клиент");
  await page.locator("#booking-phone").fill("+375291234567");
  await page.getByRole("button", { name: "Подтвердить запись" }).click();

  await expect(page).toHaveURL(/\/booking\/confirm$/);
  await expect(page.getByRole("heading", { name: "Готово" })).toBeVisible();
  await expect(page.getByText("Запись подтверждена")).toBeVisible();
  await expect(page.getByText("QA Клиент")).toBeVisible();
});

test("mock login rejects wrong OTP and accepts 1111", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Телефон").fill("+375291234567");
  await page.getByRole("button", { name: "Получить код" }).click();
  await page.getByLabel("SMS-код").fill("2222");
  await page.getByRole("button", { name: "Войти" }).click();

  await expect(page.getByText(/Неверный код/)).toBeVisible();

  await page.getByLabel("SMS-код").fill("1111");
  await page.getByRole("button", { name: "Войти" }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText("+375291234567")).toBeVisible();
});

test("STRIGLO GO mock flow submits a premium request", async ({ page }) => {
  await page.goto("/go");

  await expect(page.getByRole("heading", { name: "Выездная стрижка" })).toBeVisible();
  await page.getByRole("button", { name: /Предложить своё время/ }).click();
  await page.getByLabel("Своё время").fill("18:30");
  await page.getByRole("button", { name: /Стрижка \+ борода/ }).click();

  const barberButtons = page.getByRole("button", { name: /Свободен/ });
  if ((await barberButtons.count()) > 0) {
    await barberButtons.first().click();
  }

  await page.getByLabel("Адрес").fill("ул. Центральная, 14");
  await page.getByLabel("Имя").fill("QA GO Клиент");
  await page.getByLabel("Телефон").fill("+375291234567");
  await page.getByRole("button", { name: "Отправить GO-заявку" }).click();

  await expect(page.getByRole("heading", { name: "Заявка у мастера" })).toBeVisible();
  await expect(page.getByText("GO-заявка отправлена")).toBeVisible();
  await expect(page.getByText("QA GO Клиент")).toBeVisible();
  await expect(page.getByText("ул. Центральная, 14")).toBeVisible();
});

test("admin panel can create barber, service and assignment", async ({ page }) => {
  await page.goto("/admin");

  await page.locator("input[placeholder='Например, Никита']").fill("QA Мастер");
  await page.locator("textarea[placeholder='Короткое описание стиля мастера']").fill("Тестовый мастер");
  await page.getByRole("button", { name: "Создать мастера" }).click();
  await expect(page.getByText("QA Мастер")).toBeVisible();

  await page.getByRole("button", { name: "Услуги" }).click();
  await page.locator("input[placeholder='Например, Детская стрижка']").fill("QA Услуга");
  await page.locator("textarea[placeholder='Коротко, что входит в услугу']").fill("Тестовая услуга");
  await page.getByLabel("Минуты").fill("25");
  await page.getByLabel("BYN").fill("35");
  await page.getByRole("button", { name: "Создать услугу" }).click();
  await expect(page.getByText("QA Услуга")).toBeVisible();

  await page.getByRole("button", { name: "График" }).click();
  await page.getByRole("button", { name: "Назначить" }).click();
  await expect(page.getByText("Услуга назначена мастеру")).toBeVisible();

  await page.getByRole("button", { name: "Назначить" }).click();
  await expect(page.getByText("Эта услуга уже назначена мастеру")).toBeVisible();
});
