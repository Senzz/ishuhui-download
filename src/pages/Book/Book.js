import React from 'react';
import {
  Breadcrumb,
  Icon,
} from 'antd';
import config from '@/config'
import styles from './Book.less'
import { Link } from 'dva/router'
import { getBookList, getBookMenuInfo } from '@/services/api'

const handleMenu = (posts) => {
  const keys = Object.keys(posts);
  return keys.map((key) => {
    const arr = key.split('-');
    if(arr[0] == 'c') {
      // 卷
      return {
        type: 'c',
        key,
        c: arr[1],
        start: arr[3],      // 开始话
        end: arr[4],        // 结束话
        ...posts[key][0],
      }
    } else if(arr[0] == 'n') {
      return {
        type: 'n',
        key,
        start: arr[1],
        end: arr[1],
        ...posts[key][0],
      } 
    }
  })
}

const handleMenuFilter = (posts) => {
  const length = Object.keys(posts).length;
  let num = Math.ceil(length / 100);
  let start = 1;
  const result = [];
  while(num) {
    result.push([start, start + 99]);
    start = start + 100;
    num--;
  }
  return result;
}



export default class extends React.Component {
  state = {
    id: '',
    list: [],
    bookInfo: {},
    bookMenu: [],
    _filterdMenu: [],
    bookMenuFilter: [],
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.setState({
      id
    })
    await this.fetch();
  }
  async fetch() {
    const { id } = this.state;
    const data = await getBookList({id});
    const bool = data.errNo == 0;
    if(bool) {
      const menu = handleMenu(data.data.cartoon[0].posts);
      this.setState({
        bookInfo: data.data.book,
        bookMenu: menu,
        _filterdMenu: menu,
        bookMenuFilter: handleMenuFilter(data.data.cartoon[0].posts)
      })
    }
  }
  filter = (start, end) => {
    const { bookMenu } = this.state;
    const filtered = bookMenu.filter((item) => item.start >= start && item.start <= end);
    this.setState({
      _filterdMenu: filtered,
    })
  }
  download = async (key, name, id) => {
    const { id: bookId } = this.state;
    console.log(bookId, key);
    const data = await getBookMenuInfo(`${bookId}-0-${key}`);
    const bool = data.errNo == 0;
    if(bool) {
      const url = data.data.posts[0].url;
      const isQQ = url.indexOf('qq.com') != -1;
      let _url = url;
      if(!isQQ){
        _url = `http://hhzapi.ishuhui.com/cartoon/post/ver/76906890/id/${id}.json`;
      } else {}
      window.open(`${config.apiUrl}/download?url=${window.encodeURIComponent(_url)}&name=${name}`, '_blank');
    }
  }
  render() {
    const { bookInfo, _filterdMenu, bookMenuFilter } = this.state;

    const handleBookMenu = (menu) => {
      if (menu.type == 'c') {
        // 卷
        return (
          <div key={menu.id} className={styles['menu-c']}><strong>{menu.c}卷</strong> {menu.start}-{menu.end}</div>
        )
      } else if(menu.type == 'n') {
        return (
          <div key={menu.id} className={styles['menu-n']}>
            <div><strong>{menu.start}</strong> {menu.title}</div>
            <div>
              <Icon type="download" style={{ cursor: 'pointer' }} onClick={() => this.download(menu.key, menu.title, menu.id)} />
            </div>
          </div>
        )
      }
    }

    return (
      <div className={styles['root']}>
        <div className={styles['breadcrumb']}>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{bookInfo.name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <main>
          <h1>{bookInfo.name}</h1>
          <div>筛选：</div> 
          <div className={styles['menu-filter']}>
            
            {
              bookMenuFilter.map(arr => (
                <div onClick={() => this.filter(arr[0], arr[1])} key={arr[0]} className={styles['menu-filter-item']}>{arr[0]}-{arr[1]}</div>
              ))
            }
          </div>

          <div>漫画：</div>
          <div className={styles['menu']}>
            {
              _filterdMenu.map(menu => (
                handleBookMenu(menu)
              ))
            }
          </div>
        </main>
      </div>
    );
  }
}
