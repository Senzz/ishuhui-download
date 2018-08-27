import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Form,
  Badge,
  Divider,
} from 'antd';

import StandardTable from '@/components/StandardTable'

const statusMap = ['default', 'processing', 'success', 'error'];
const imgUri = 'http://pic03.ishuhui.com';

@connect(({ loading, home }) => ({
  home: home,
  loading: loading.models.home,
}))
@Form.create()
export default class Home extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'problemManagement/saveQuestionParams',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue)
      if (err) return;
      const values = {
        page: 1,
        ...fieldsValue
      };

      dispatch({
        type: 'problemManagement/saveQuestionParams',
        payload: values,
      });
    });
  };

  render() {
    const {
      loading,
      home: { list, page, pageSize, total }
    } = this.props;

    const { selectedRows } = this.state;

    const data = {
      list: list,
      pagination: {
        current: page,
        pageSize: pageSize,
        total: total
      }
    }
    console.log(data, list); 
    const columns = [
      {
        title: '漫画',
        dataIndex: 'name',
      },
      {
        title: '缩略图',
        dataIndex: 'thumb',
        render: imgSrc => <img  src={imgSrc.replace('/upload', imgUri)} alt='' />
      },
      {
        title: '热门问题',
        dataIndex: 'hot',
        render(val) {
          if (val == 2) {
            return <Badge status={statusMap[2]} text='是' />;
          } else {
            return <Badge status={statusMap[0]} text='否' />;
          }
        },
      },
      {
        title: '操作',
        render: (item) => {
          return (
            <Fragment>
              <a onClick={e => this.edit(item)}>编辑</a>
              <Divider type="vertical" />
            </Fragment>
          )
        },
      },
    ];



    return (
      <div style={{ background: '#fff', display: 'flex' }}>
        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-24 ant-col-md-24">
          <Card bordered={false}>
            <div className={_styles.tableList}>
              <StandardTable
                notNeedCheckbox={true}
                selectedRows={selectedRows}
                loading={loading}
                data={data}
                rowKey='id'
                columns={columns}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
