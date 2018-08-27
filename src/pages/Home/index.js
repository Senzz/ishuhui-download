import React from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Badge,
  Divider,
  Row,
  Col,
} from 'antd';
import styles from './index.less'
import hasShow from '@/HOC/hasShow'

const imgUri = 'http://pic03.ishuhui.com';

const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);

@connect(({ home }) => ({
  home: home,
}))
@hasShow('props.home.list')
export default class extends React.Component {
  componentDidMount() {
    
    document.onscroll = () => {
      if(bottomVisible()) {
        const { page } = this.props.home;
        this.props.dispatch({
          type: 'home/save2fetch',
          payload: {
            page: page + 1,
          }
        })
      }
    };
  }
  jump = (book) => () => {
    this.props.history.push(`/book/${book}`)
  }
  render() {
    const {
      home: { list  }
    } = this.props;

    return (
      <div style={{ background: '#fff' }}>
        <div className={styles['wrapper']}>
          {
            list.map(item => (
              <div key={item.book} onClick={this.jump(item.book)} className={styles['item']}>
                <div>
                  <img  src={item.thumb.replace('/upload', imgUri)} alt={item.name} />
                </div>
                <div>
                  <strong>{item.name}</strong>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
