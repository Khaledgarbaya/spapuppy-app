import { test, expect } from '@playwright/test';
import { format } from 'date-fns';

test.describe('Waiting List', () => {
  test.beforeEach(async ({ page }) => {
    // Enable request logging
    page.on('request', request => console.log(`>> ${request.method()} ${request.url()}`));
    page.on('response', response => console.log(`<< ${response.status()} ${response.url()}`));
  });

  test('should display waiting list data', async ({ page }) => {
    // Get today's date in the format expected by the API
    const today = format(new Date(), 'yyyy-MM-dd');
    let apiCalled = false;

    // Mock the waiting list API response
    await page.route(`**/waiting-list/by-date?date=${today}`, async (route) => {
      console.log('Mocking API response for waiting list');
      apiCalled = true;
      const mockData = {
        puppies: [
          {
            id: '1',
            name: 'Buddy',
            breed: 'Golden Retriever',
            ownerName: 'John Doe',
            ownerPhone: '123-456-7890',
            service: 'Grooming',
            status: 'waiting',
            arrivalTime: '10:00 AM',
            notes: 'First time visit',
            date: today
          }
        ]
      };
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    });

    // Navigate to the page
    console.log('Navigating to homepage');
    await page.goto('/');

    // Wait for the API call to be made
    console.log('Waiting for API call');
    await expect.poll(() => apiCalled, {
      message: 'Waiting for API to be called',
      timeout: 10000,
    }).toBe(true);

    // Wait for the puppy list to be visible
    console.log('Waiting for puppy list');
    await page.waitForSelector('[data-testid="puppy-list"]', { timeout: 30000 });

    // Verify the mocked data is displayed
    console.log('Verifying puppy card');
    const puppyCard = await page.locator('[data-testid="puppy-card"]').first();
    await expect(puppyCard).toBeVisible();

    const puppyName = await page.locator('[data-testid="puppy-name"]').first().textContent();
    expect(puppyName).toBe('Buddy');

    const puppyBreed = await page.locator('[data-testid="puppy-breed"]').first().textContent();
    expect(puppyBreed).toBe('Golden Retriever');

    // Verify buttons are present
    const statusButton = await page.locator('[data-testid="status-button"]').first();
    await expect(statusButton).toBeVisible();
    await expect(statusButton).toHaveText('Start Service');

    const removeButton = await page.locator('[data-testid="remove-button"]').first();
    await expect(removeButton).toBeVisible();
  });

  test('should show empty state when no puppies', async ({ page }) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    let apiCalled = false;

    // Mock empty waiting list with specific date
    await page.route(`**/waiting-list/by-date?date=${today}`, async (route) => {
      apiCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ puppies: [] }),
      });
    });

    // Navigate to the page
    await page.goto('/');

    // Wait for the API call to complete
    await expect.poll(() => apiCalled, {
      message: 'Waiting for API to be called',
      timeout: 10000,
    }).toBe(true);

    // Wait for either the puppy list or empty state to be present
    await Promise.race([
      page.waitForSelector('[data-testid="puppy-list"]', { state: 'attached' }),
      page.waitForSelector('[data-testid="empty-list"]', { state: 'attached' })
    ]);

    // Verify empty state is shown
    const emptyState = page.locator('[data-testid="empty-list"]');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('No puppies in this category');
  });

  test('should be able to add a new puppy to the waiting list', async ({ page }) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    let addPuppyCalled = false;
    let waitingListCalled = false;

    // Mock the initial empty list
    await page.route(`**/waiting-list/by-date?date=${today}`, async (route) => {
      waitingListCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ puppies: [] }),
      });
    });

    // Mock the add puppy endpoint
    await page.route('**/puppies', async (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        addPuppyCalled = true;
        const body = JSON.parse(request.postData() || '{}');
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ 
            ...body, 
            id: '1',
            status: 'waiting',
            date: today,
            arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }),
        });

        // After adding the puppy, mock the updated waiting list
        await page.route(`**/waiting-list/by-date?date=${today}`, async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              puppies: [
                {
                  id: '1',
                  name: 'Max',
                  breed: 'Labrador',
                  ownerName: 'Jane Smith',
                  ownerPhone: '(555) 123-4567',
                  service: 'Full Grooming',
                  status: 'waiting',
                  date: today,
                  arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              ]
            }),
          });
        });
      }
    });

    // Navigate to the page
    await page.goto('/');

    // Wait for the form to be visible
    await expect(page.getByLabel('Puppy Name')).toBeVisible();

    // Fill out the add puppy form
    await page.getByLabel('Puppy Name').fill('Max');
    await page.getByLabel('Breed').fill('Labrador');
    await page.getByLabel('Owner Name').fill('Jane Smith');
    await page.getByLabel('Owner Phone').fill('(555) 123-4567');
    await page.getByLabel('Service').click();
    await page.getByRole('option', { name: 'Full Grooming' }).click();
    await page.getByLabel('Notes').fill('First visit');

    // Submit the form
    await page.getByRole('button', { name: 'Add to Waiting List' }).click();

    // Wait for the API calls to complete
    await expect.poll(() => addPuppyCalled, {
      message: 'Waiting for add puppy API to be called',
      timeout: 10000,
    }).toBe(true);

    // Wait for the puppy card to appear
    await expect(page.locator('[data-testid="puppy-card"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-testid="puppy-name"]')).toContainText('Max', { timeout: 10000 });
  });

  test('should be able to create a new waiting list for each day', async ({ page }) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    let newListCalled = false;
    
    // Mock the new list creation endpoint
    await page.route('**/waiting-list/new', async (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        newListCalled = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      }
    });

    // Mock empty list response
    await page.route(`**/waiting-list/by-date?date=${today}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ puppies: [] }),
      });
    });

    await page.goto('/');
    
    // Wait for the New List button to be enabled
    const newListButton = page.getByRole('button', { name: 'New List' });
    await expect(newListButton).toBeEnabled();
    
    // Click the "New List" button
    await newListButton.click();

    // Wait for the API call to complete
    await expect.poll(() => newListCalled, {
      message: 'Waiting for new list API to be called',
      timeout: 10000,
    }).toBe(true);

    // Verify empty list is shown
    await expect(page.locator('[data-testid="empty-list"]')).toBeVisible({ timeout: 10000 });
  });

  test('should be able to search through waiting list history', async ({ page }) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Mock the initial list with searchable puppies
    await page.route(`**/waiting-list/by-date?date=${today}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          puppies: [
            {
              id: '1',
              name: 'Unique Name',
              status: 'completed',
              breed: 'Special Breed',
              ownerName: 'Unique Owner',
              ownerPhone: '(555) 444-4444',
              service: 'Special Service',
              arrivalTime: '09:00 AM',
              notes: 'Unique notes'
            },
            {
              id: '2',
              name: 'Regular Name',
              status: 'waiting',
              breed: 'Regular Breed',
              ownerName: 'Regular Owner',
              ownerPhone: '(555) 555-5555',
              service: 'Regular Service',
              arrivalTime: '10:00 AM'
            }
          ]
        }),
      });
    });

    await page.goto('/');

    // Enter search term
    await page.getByPlaceholder('Search puppies by any detail...').fill('Unique');

    // Verify only the matching puppy is shown
    await expect(page.locator('[data-testid="puppy-card"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="puppy-name"]')).toContainText('Unique Name');

    // Clear search and verify both puppies are shown
    await page.getByPlaceholder('Search puppies by any detail...').fill('');
    await expect(page.locator('[data-testid="puppy-card"]')).toHaveCount(2);

    // Test case-insensitive search
    await page.getByPlaceholder('Search puppies by any detail...').fill('unique');
    await expect(page.locator('[data-testid="puppy-card"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="puppy-name"]')).toContainText('Unique Name');

    // Test partial match
    await page.getByPlaceholder('Search puppies by any detail...').fill('Uniq');
    await expect(page.locator('[data-testid="puppy-card"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="puppy-name"]')).toContainText('Unique Name');
  });

  test('should be able to remove a puppy from the waiting list', async ({ page }) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    let deleteApiCalled = false;

    // Mock initial list with a puppy
    await page.route(`**/waiting-list/by-date?date=${today}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          puppies: [
            {
              id: '1',
              name: 'Remove Test Puppy',
              breed: 'Poodle',
              status: 'waiting',
              ownerName: 'Test Owner',
              ownerPhone: '(555) 111-1111',
              service: 'Grooming',
              date: today,
              arrivalTime: '09:00 AM'
            }
          ]
        }),
      });
    });

    // Mock the delete endpoint
    await page.route('**/puppies/*', async (route) => {
      if (route.request().method() === 'DELETE') {
        deleteApiCalled = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });

        // Update the waiting list to be empty after deletion
        await page.route(`**/waiting-list/by-date?date=${today}`, async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ puppies: [] }),
          });
        });
      }
    });

    await page.goto('/');

    // Wait for the puppy card to be visible
    await expect(page.locator('[data-testid="puppy-card"]')).toBeVisible({ timeout: 10000 });
    
    // Click the remove button
    const removeButton = page.locator('[data-testid="remove-button"]').first();
    await expect(removeButton).toBeVisible({ timeout: 10000 });
    await removeButton.click();

    // Wait for the API call to complete
    await expect.poll(() => deleteApiCalled, {
      message: 'Waiting for delete API to be called',
      timeout: 10000,
    }).toBe(true);

    // Wait for the puppy to be removed and empty state to appear
    await expect(page.locator('[data-testid="puppy-card"]')).toHaveCount(0, { timeout: 10000 });
    await expect(page.locator('[data-testid="empty-list"]')).toBeVisible({ timeout: 10000 });
  });
}); 
