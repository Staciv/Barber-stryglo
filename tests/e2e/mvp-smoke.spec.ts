import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
});

test("home page loads with booking CTA and STRIGLO branding", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Запишись к барберу/ })).toBeVisible();
  await expect(page.getByText("STRIGLO").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Записаться" })).toHaveAttribute("href", "/booking");
});

test("booking mock flow creates a confirmed appointment", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Телефон").fill("+375291234567");
  await page.getByRole("button", { name: "Получить код" }).click();
  await page.getByLabel("SMS-код").fill("1111");
  await page.getByRole("button", { name: "Войти" }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/booking");

  await expect(page.getByRole("button", { name: /Продолжить/ })).toBeDisabled();
  await page.getByRole("button", { name: /Выбрать слот/ }).first().click();

  const barberButtons = page.getByRole("button", { name: /Свободен/ });
  if ((await barberButtons.count()) > 0) {
    await barberButtons.first().click();
  }

  await page.getByRole("button", { name: "Продолжить" }).click();
  await expect(page.getByText("Проверенный телефон")).toBeVisible();
  await expect(page.getByText("+375291234567")).toBeVisible();
  await page.locator("#booking-name").fill("QA Клиент");
  await page.locator("#booking-comment").fill("Тестовый комментарий");
  await page.getByRole("button", { name: "Подтвердить запись" }).click();

  await expect(page).toHaveURL(/\/booking\/confirm$/);
  await expect(page.getByRole("heading", { name: "Готово" })).toBeVisible();
  await expect(page.getByText("Запись подтверждена")).toBeVisible();
  await expect(page.getByText("QA Клиент")).toBeVisible();
  await expect(page.getByText("+375291234567")).toBeVisible();
  await expect(page.getByText(/\d+\sр\./)).toBeVisible();
  await expect(page.getByText(/мин/)).toBeVisible();

  await page.goto("/activity");
  await expect(page.getByText(/Мужская стрижка/)).toBeVisible();
  await expect(page.getByText(/\d+\sр\./)).toBeVisible();
});

test("activity shows empty state when there are no appointments", async ({ page }) => {
  await page.goto("/activity");

  await expect(page.getByText("У тебя пока нет записей")).toBeVisible();
  await expect(page.getByRole("link", { name: "Новая запись" })).toHaveAttribute("href", "/booking");
});

test("booking contact form requires name and Belarus phone", async ({ page }) => {
  await page.goto("/booking");

  await page.getByRole("button", { name: /Выбрать слот/ }).first().click();

  const barberButtons = page.getByRole("button", { name: /Свободен/ });
  if ((await barberButtons.count()) > 0) {
    await barberButtons.first().click();
  }

  await page.getByRole("button", { name: "Продолжить" }).click();
  await page.getByRole("button", { name: "Подтвердить запись" }).click();
  await expect(page.getByText("Введите имя")).toBeVisible();
  await expect(page.getByText("Введите телефон")).toBeVisible();

  await page.locator("#booking-name").fill("QA Клиент");
  await page.locator("#booking-phone").fill("12345");
  await page.getByRole("button", { name: "Подтвердить запись" }).click();
  await expect(page.getByText(/Номер должен содержать|белорусский номер/)).toBeVisible();

  await page.locator("#booking-phone").fill("+375331234567");
  await page.getByRole("button", { name: "Подтвердить запись" }).click();
  await expect(page.getByText(/Подтверди телефон/)).toBeVisible();
  await page.getByLabel("SMS-код").fill("1111");
  await page.getByRole("button", { name: "Подтвердить телефон" }).click();
  await expect(page.getByText(/Подтверди телефон/)).not.toBeVisible();
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
  await page.goto("/login");
  await page.getByLabel("Телефон").fill("+375291234567");
  await page.getByRole("button", { name: "Получить код" }).click();
  await page.getByLabel("SMS-код").fill("1111");
  await page.getByRole("button", { name: "Войти" }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/go");

  await expect(page.getByRole("heading", { name: "Выездная стрижка" })).toBeVisible();
  await page.getByRole("button", { name: /Предложить своё время/ }).click();
  await expect(page.getByLabel("Телефон")).toHaveValue("29 123 45 67");
  await expect(page.getByLabel("Дата")).toBeVisible();
  await page.getByLabel("Дата").selectOption({ index: 1 });
  await page.getByLabel("Время").fill("18:30");
  await expect(page.getByText(/Выезд:/)).toBeVisible();
  await page.getByRole("button", { name: /Мужская стрижка \+ борода/ }).click();

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
  await expect(page.getByText(/\d+\sр\./)).toBeVisible();

  await page.getByRole("link", { name: "Активность" }).click();
  await expect(page).toHaveURL(/\/activity$/);
  await expect(page.getByText("Нет активных GO заявок")).not.toBeVisible();
  await expect(page.getByText(/Мужская стрижка \+ борода/)).toBeVisible();
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
  await page.getByLabel("р.").fill("35");
  await page.getByRole("button", { name: "Создать услугу" }).click();
  await expect(page.getByText("QA Услуга")).toBeVisible();

  await page.getByRole("button", { name: "График" }).click();
  await page.getByRole("button", { name: "Назначить" }).click();
  await expect(page.getByText("Услуга назначена мастеру")).toBeVisible();

  await page.getByRole("button", { name: "Назначить" }).click();
  await expect(page.getByText("Эта услуга уже назначена мастеру")).toBeVisible();
});

test("voice mock flow creates an appointment", async ({ page }) => {
  await page.goto("/voice");

  await expect(page.getByRole("heading", { name: "Голосовая запись" })).toBeVisible();
  await page.getByRole("button", { name: "Начать mock voice booking" }).click();
  await expect(page.getByText(/Запиши меня завтра/)).toBeVisible();
  await expect(page.getByText(/18:30/)).toBeVisible();
  await page.getByRole("button", { name: "Подтвердить запись" }).click();

  await expect(page).toHaveURL(/\/booking\/confirm$/);
  await expect(page.getByText("Voice mock клиент")).toBeVisible();
  await expect(page.getByText(/\d+\sр\./)).toBeVisible();

  await page.goto("/activity");
  await expect(page.getByText(/Мужская стрижка/)).toBeVisible();
});

test("recommendation mock flow shows result and routes to booking", async ({ page }) => {
  await page.goto("/recommendation");

  await page.getByRole("button", { name: "Короткая" }).click();
  await page.getByRole("button", { name: "Аккуратный" }).click();
  await page.getByRole("button", { name: "До 2 минут" }).click();
  await page.getByRole("button", { name: "Да" }).click();

  await expect(page.getByText("Тебе подойдёт: Crop Fade")).toBeVisible();
  await expect(page.getByText(/\d+\sр\./)).toBeVisible();

  await page.getByRole("button", { name: "Записаться с этой рекомендацией" }).click();
  await expect(page).toHaveURL(/\/booking$/);
  await expect(page.getByRole("button", { name: /Мужская стрижка \+ борода/ })).toHaveAttribute("aria-pressed", "true");
});
