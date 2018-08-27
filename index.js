const puppeteer = require('puppeteer');
const fs = require('fs');
const archiver = require('archiver');
const request = require('request');
const { downloadImgs } = require('./utils/downloadImg')

const url = 'http://ac.qq.com/ComicView/index/id/505430/cid/1';
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

(async () => {
  const browser = await puppeteer.launch({
    executablePath: './chromium/chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('#comicContain');
  // 漫画
  // 获取漫画列表
  const _imgs = await page.evaluate(async () => {
    const eles = [...document.querySelectorAll('#comicContain li')];
    const scrollToAnchor = (ele) => {
      let anchorElement = ele;
      if (anchorElement) { anchorElement.scrollIntoView(); }
    }
    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    await (async () => {
      for(let i = 0; i <= eles.length; i++) {
        await sleep(200);
        scrollToAnchor(eles[i]);
      }
    })();
  });
  const imgs = await page.$$eval('#comicContain img.loaded', (arr) => arr.map(img => img.src));
  await browser.close();
  generateZip(imgs);
})();

function generateZip(imgs) {
  const output = fs.createWriteStream(__dirname + '/example.zip');
  archive.pipe(output);

  output.on('end', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  const reqImgs = downloadImgs(imgs);
  reqImgs.forEach((reqImg, index) => {
    archive.append(reqImg, { name: index + '.png' });
  })
  archive.finalize();
}
