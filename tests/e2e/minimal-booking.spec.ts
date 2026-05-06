import { expect, test } from "@playwright/test";

test("catalog presents package comparison hierarchy", async ({ page }) => {
  await page.goto("/plans");

  await expect(
    page.getByRole("heading", { name: "选择当天要体验的和服套餐" }),
  ).toBeVisible();
  await expect(page.getByText("4 个套餐可预约")).toBeVisible();

  const catalog = page.getByRole("region", { name: "套餐列表" });
  await expect(catalog.getByRole("link")).toHaveCount(4);
  await expect(catalog.getByText("线上价")).toHaveCount(4);
  await expect(catalog.getByText("时长")).toHaveCount(4);
  await expect(catalog.getByText("推荐场景")).toHaveCount(4);
  await expect(catalog.getByText("包含")).toHaveCount(4);
  await expect(catalog.getByRole("link", { name: /查看详情/ })).toHaveCount(4);
});

test("guest can create a booking draft from the catalog", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "选择当天要体验的和服套餐" }),
  ).toBeVisible();

  await page.getByRole("link", { name: /和服初体验·轻装上阵/ }).click();
  await expect(
    page.getByRole("heading", { name: "和服初体验·轻装上阵" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "加入购物车" }).click();
  await expect(page.getByRole("heading", { name: "购物车" })).toBeVisible();
  await expect(page.getByText("浅草本店")).toBeVisible();

  await page.getByRole("link", { name: "创建预约草稿" }).click();
  await expect(
    page.getByRole("heading", { name: "创建预约草稿" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "提交预约草稿" }).click();
  await expect(
    page.getByRole("heading", { name: "预约草稿已创建" }),
  ).toBeVisible();
  await expect(page.getByText("和服初体验·轻装上阵")).toBeVisible();
});
