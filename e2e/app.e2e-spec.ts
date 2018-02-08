import { MeanpostlistAngular2Page } from './app.po';

describe('mean-postlist-angular2 App', () => {
  let page: MeanpostlistAngular2Page;

  beforeEach(() => {
    page = new MeanpostlistAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
