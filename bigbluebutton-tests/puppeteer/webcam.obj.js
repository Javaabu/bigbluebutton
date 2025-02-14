const Share = require('./webcam/share');
const Check = require('./webcam/check');
const Page = require('./core/page');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { MAX_WEBCAM_TEST_TIMEOUT } = require('./core/constants');

expect.extend({ toMatchImageSnapshot });

const webcamTest = () => {
  beforeEach(() => {
    jest.setTimeout(MAX_WEBCAM_TEST_TIMEOUT);
  });

  test('Shares webcam', async () => {
    const test = new Share();
    let response;
    let screenshot;
    try {
      const testName = 'shareWebcam';
      await test.logger('begin of ', testName);
      await test.init(Page.getArgs(), undefined, undefined, undefined, testName);
      await test.startRecording(testName);
      response = await test.test();
      await test.stopRecording();
      screenshot = await test.page.screenshot();
      await test.logger('end of ', testName);
    } catch (e) {
      await test.logger(e);
    } finally {
      await test.close();
    }
    expect(response).toBe(true);
    await Page.checkRegression(0.81, screenshot);
  });

  test('Checks content of webcam', async () => {
    const test = new Check();
    let response;
    let screenshot;
    try {
      const testName = 'checkWebcamContent';
      await test.logger('begin of ', testName);
      await test.init(Page.getArgs(), undefined, undefined, undefined, testName);
      await test.startRecording(testName);
      response = await test.test();
      await test.stopRecording();
      screenshot = await test.page.screenshot();
      await test.logger('end of ', testName);
    } catch (e) {
      await test.logger(e);
    } finally {
      await test.close();
    }
    expect(response).toBe(true);
    await Page.checkRegression(7.5, screenshot);
  });
};
module.exports = exports = webcamTest;
