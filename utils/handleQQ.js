const archiver = require('archiver');
const { downloadImgs } = require('./downloadImg');
const puppeteer = require('puppeteer');
const path = require('path');
module.exports = (res, url, name) => {
  res.writeHead(200, {
    'Content-Type': 'application/x-msdownload',
    'Content-Disposition': 'attachment; filename=' + encodeURIComponent(name) + '.zip'
  });

  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  (async () => {
    console.log(path.join(__dirname, '../chromium/chrome.exe'))
    const browser = await puppeteer.launch({
      executablePath: path.join(__dirname, '../chromium/chrome.exe'),
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
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
        for (let i = 0; i <= eles.length; i++) {
          await sleep(200);
          scrollToAnchor(eles[i]);
        }
      })();
    });
    const imgs = await page.$$eval('#comicContain img.loaded', (arr) => arr.map(img => img.src));
    await browser.close();
    generateZip(res, archive, imgs);
  })();
}

function generateZip(res, archive, imgs) {
  archive.pipe(res);

  archive.on('end', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    res.end();
  });

  const reqImgs = downloadImgs(imgs);
  reqImgs.forEach((reqImg, index) => {
    archive.append(reqImg, { name: index + '.png' });
  })
  archive.finalize();
}