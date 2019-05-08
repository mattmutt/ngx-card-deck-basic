import { DemoDashboardPage } from './demo-dashboard.po';

describe('dashboard demo page', () => {
   let page: DemoDashboardPage;

   beforeEach(() => {
      page = new DemoDashboardPage();
      page.navigateTo();
   });

   it('verify 4-card layout with sample titles on deck', async () => {

      const expectedTitleList: Array<string> = [
          "Hello 1 Introduction",
          "Hello 2 Introduction",
          "Satellite - USA",
          "Test Plugin",
      ];

      expect(await page.getCardCount()).toEqual(expectedTitleList.length);
      expect((await page.getCardTitleTextList()).sort()).toEqual(expectedTitleList.sort());
      expect((await page.getCardTitleTextList()).sort()).not.toContain("garbage title"); // negative

   });

});
