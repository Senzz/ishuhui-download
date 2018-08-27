const express = require('express');
const request = require('request');
const router = express.Router();
const handleIShuHui = require('../utils/handleIShuHui');
const handleQQ = require('../utils/handleQQ');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// 统一的鼠绘转发代理接口
router.post('/ishuhuiApi', (req, res) => {
  const { url, method } = req.body;
  request(url, {
    method
  }, (error, _, body) => {
    if (!error) {
      res.end(body);
    } else {
      res.end(JSON.stringify({
        errNo: 1,
        errMsg: "接口出错"
      }));
    }
  })
})

// 下载某话
router.get('/download', (req, res) => {
  const { url, name } = req.query;
  console.log(url, name);
  const isQQ = url.indexOf('qq.com') != -1;
  // 分为鼠绘 和 腾讯漫画
  
  if(isQQ) {
    handleQQ(res, url, name);
  } else {
    handleIShuHui(res, url, name);
  }
})

module.exports = router;
