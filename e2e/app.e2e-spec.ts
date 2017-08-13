import { AdB2cOidcAngularPage } from './app.po';

describe('ad-b2c-oidc-angular App', () => {
  let page: AdB2cOidcAngularPage;

  beforeEach(() => {
    page = new AdB2cOidcAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
