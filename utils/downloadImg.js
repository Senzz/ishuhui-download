const request = require('request');

const downloadImg = (url) => {
  return request.get(url);
}

const downloadImgs = (arr) => {
  return arr.map(imgSrc => {
    return downloadImg(imgSrc);
  });
}

module.exports = {
  downloadImgs, downloadImg
}