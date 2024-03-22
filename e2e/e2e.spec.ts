// @ts-check
import { test, expect } from '@playwright/test';

test('application flow', async ({ page }) => {
  // navigate
  await page.goto('http://localhost:5173');

  // add a default ToDo
  await page.getByTestId('add').click();

  const beforeCount = await page.locator('#todoList li').count();
  await page.getByTestId('create').click();

  // wait for the list to have a new item in it
  await expect(page.locator('#todoList li')).toHaveCount(beforeCount + 1);

  // see that it has the default text
  await expect(page.locator('#todoList li h2').last()).toHaveText('ToDo Title');
  await expect(page.locator('#todoList li p').last()).toHaveText(
    'ToDo Description',
  );

  // click its edit button
  await page.locator('#todoList li button').last().click();

  // and wait for the modal to open
  await expect(page.getByTestId('editTitle')).toHaveValue('ToDo Title');
  await expect(page.getByTestId('editDescription')).toHaveValue(
    'ToDo Description',
  );

  // type into the edit modal
  await page.getByTestId('editTitle').fill('E2E Title');
  await page.getByTestId('editDescription').fill('E2E Description');

  await page.getByTestId('edit').click();

  // wait for the list to be updated
  await expect(page.locator('#todoList li h2').last()).toHaveText('E2E Title');
  await expect(page.locator('#todoList li p').last()).toHaveText(
    'E2E Description',
  );

  // mark it as complete
  await page.locator('#todoList li input').last().click();

  // and delete it
  const beforeDeleteCount = await page.locator('#todoList li').count();
  await expect(page.getByTestId('delete')).toBeVisible();
  await page.getByTestId('delete').click();
  await expect(page.locator('#todoList li')).toHaveCount(beforeDeleteCount - 1);
});
