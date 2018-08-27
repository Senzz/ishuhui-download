import request from '../utils/request';

const ishuhuiApiWrapped = (body) => {
  return request("/ishuhuiApi", {
    method: 'post',
    credentials: "same-origin",
    body
  })
}
// 获取漫画列表
export async function getCartoonList(params) {
  return ishuhuiApiWrapped({
    url: `http://api.ishuhui.com/cartoon/category_latest/ver/2c478308/page/${params.page}.json`,
    method: 'get'
  });
}

// 获取漫画的目录
export async function getBookList(params) {
  return ishuhuiApiWrapped({
    url: `http://api.ishuhui.com/cartoon/book_ish/ver/60508875/id/${params.id}.json`,
    method: 'get'
  });
}

// 获取漫画 某话信息，真实地址
export async function getBookMenuInfo(key) {
  return ishuhuiApiWrapped({
    url: `http://api.ishuhui.com/cartoon/post/ver/8a518961/num/${key}.json`,
    method: 'get'
  });
}

// 获取漫画 某话信息，真实地址
export async function download(url) {
  return request('/download', {
    method: 'post',
    credentials: "same-origin",
    body: {
      url,
    }
  });
}


