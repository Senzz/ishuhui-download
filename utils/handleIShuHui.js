
const archiver = require('archiver');
const { downloadImgs } = require('./downloadImg')
const imgUri = 'http://pic03.ishuhui.com';
const request = require('request');
module.exports = (res, url, name) => {

  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  res.writeHead(200, {
    'Content-Type': 'application/x-msdownload',
    'Content-Disposition': 'attachment; filename=' + encodeURIComponent(name) + '.zip'
  });

  archive.pipe(res);

  archive.on('end', function () {
    console.log(archive.pointer() + ' total bytes');
    res.end(200);
  });

  request({
    url,
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    json: true
  }, (err, _, body) => {
    if (!err) {
      const imgsObject = JSON.parse(body.data.content_img);
      const imgs = Object.keys(imgsObject).map(key => imgsObject[key].replace("/upload", imgUri));
      const reqImgs = downloadImgs(imgs);
      reqImgs.forEach((reqImg, index) => {
        archive.append(reqImg, { name: index + '.png' });
      })
      archive.finalize();
    }
  });
}