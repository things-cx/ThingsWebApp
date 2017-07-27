import { Things.WebPage } from './app.po';

describe('things.web App', () => {
  let page: Things.WebPage;

  beforeEach(() => {
    page = new Things.WebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
