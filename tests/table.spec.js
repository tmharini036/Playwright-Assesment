import { test, expect } from '@playwright/test';
import { TablePage } from '../Pages/tablePage.js';
import { env } from '../utils/envConfig.js';



test.describe('Course table', () => {
  /** @type {TablePage} */
  let tablePage;

  test.beforeEach(async ({ page }) => {
    tablePage = new TablePage(page);
    await tablePage.open();
  });

  test('TC-TABLE-01: Language Java shows only Java courses', async () => {
    await tablePage.selectLanguage('Java');

    const courses = await tablePage.getVisibleCourses();
    expect(courses.length).toBeGreaterThan(0);
    expect(courses.every((course) => course.language === 'Java')).toBeTruthy();
  });

  test('TC-TABLE-02: Beginner level shows only Beginner courses', async () => {
    await tablePage.setLevel('Intermediate', false);
    await tablePage.setLevel('Advanced', false);

    const courses = await tablePage.getVisibleCourses();
    expect(courses.length).toBeGreaterThan(0);
    expect(courses.every((course) => course.level === 'Beginner')).toBeTruthy();
  });

  test('TC-TABLE-03: Min enrollments 10,000+ keeps rows at or above 10000', async () => {
    await tablePage.selectMinEnrollments(env.table.minEnrollments);

    const courses = await tablePage.getVisibleCourses();
    expect(courses.length).toBeGreaterThan(0);
    expect(courses.every((course) => course.enrollments >= 10_000)).toBeTruthy();
  });

  test('TC-TABLE-04: Python, Beginner, and 10,000+ match together', async () => {
    await tablePage.selectLanguage('Python');
    await tablePage.setLevel('Intermediate', false);
    await tablePage.setLevel('Advanced', false);
    await tablePage.selectMinEnrollments(env.table.minEnrollments);

    const courses = await tablePage.getVisibleCourses();
    expect(courses.length).toBeGreaterThan(0);
    expect(
      courses.every(
        (course) =>
          course.language === 'Python' &&
          course.level === 'Beginner' &&
          course.enrollments >= 10_000,
      ),
    ).toBeTruthy();
  });

  test('TC-TABLE-05: a combination with no matches shows the empty state', async () => {
    await tablePage.selectLanguage('Python');
    await tablePage.setLevel('Beginner', false);
    await tablePage.setLevel('Intermediate', false);

    await expect(tablePage.noData).toBeVisible();
    await expect(tablePage.noData).toHaveText(env.table.noMatchMessage);
    await expect(tablePage.getVisibleCourses()).resolves.toEqual([]);
  });

  test('TC-TABLE-06: Reset restores the default filters and all rows', async () => {
    const initialCourses = await tablePage.getVisibleCourses();
    await expect(tablePage.resetButton).toBeHidden();

    await tablePage.selectLanguage('Java');
    await expect(tablePage.resetButton).toBeVisible();

    await tablePage.reset();

    await expect(tablePage.language('Any')).toBeChecked();
    await expect(tablePage.level('Beginner')).toBeChecked();
    await expect(tablePage.level('Intermediate')).toBeChecked();
    await expect(tablePage.level('Advanced')).toBeChecked();
    await expect(tablePage.enrollLabel).toHaveText('Any');
    await expect(tablePage.resetButton).toBeHidden();
    expect(await tablePage.getVisibleCourses()).toEqual(initialCourses);
  });

  test('TC-TABLE-07: Enrollments sort is numeric ascending', async () => {
    await tablePage.sortBy('col_enroll');

    const enrollments = (await tablePage.getVisibleCourses()).map((course) => course.enrollments);
    expect(enrollments.length).toBeGreaterThan(1);

    const numericOrder = [...enrollments].sort((left, right) => left - right);
    expect(enrollments).toEqual(numericOrder);
  });

 
});
