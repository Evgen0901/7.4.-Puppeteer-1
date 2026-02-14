const { TimeoutError } = require("puppeteer");

let page;

beforeEach(async () => {
  page = await browser.newPage();
}, 10000);

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 10000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    const expected = "GitHub · Change is constant. GitHub keeps you ahead. · GitHub";
    expect(title2).toEqual(expected);
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    const expected = "#start-of-content";
    expect(actual).toEqual(expected);
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    const expected = "Get started with Team";
    expect(actual).toContain(expected)
  }, 10000);
});

describe("Github new 3 tests", () => {

  test("The h1 header in page enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    await page.waitForSelector('h1');
    const title = await page.title();
    const expected = "GitHub Enterprise · The AI-powered developer platform for the agent-ready enterprise · GitHub";
    expect(title).toContain(expected);
    expect(title).toContain("Enterprise");
    expect(title).toContain("GitHub");
  }, 10000);

  test("The page issues contains button", async () => {
    await page.goto("https://github.com/features/issues");
    const btnSelector = "[data-ref='hero-primary-action-2r6Ty4cT89L7IAyQyt1cAS']";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    const expected = "Start using projects";
    expect(actual).toContain(expected);
  }, 10000);

 test("The h1 preview in page startups", async () => {
  await page.goto("https://github.com/enterprise/startups");
  await page.waitForSelector('h1');
  const extractedText = await page.$eval("h1.col-10-max.color-fg-default.mx-auto.h1-mktg", (el) => el.textContent);
  const expected = "Scale your startup" + "on GitHub";
  expect(extractedText).toContain(expected);
}, 20000);
});