import * as Api from '@/services/api'

export default {
  namespace: 'home',
  subscriptions: {
    async setup({ dispatch, history }) {
      console.log('sb2')
      dispatch({
        type: 'fetchList'
      })
    }
  },
  state: {
    list: null,
    pageSize: 15,
    total: 10, 
    // parmas
    page: 1,
    
  },

  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const { page, list } = yield select(state => state.home);
      const data = yield call(Api.getCartoonList, { page });
      const bool = data.errNo == 0;
      const _list = list || [];
      if(bool) {
        yield put({
          type: 'save',
          payload: {
            list: _list.concat(data.data.data),
            total: data.data.count,
          }
        })
      }
    },
    *save2fetch({ payload }, { call, put, select }) {
      yield put({
        type: 'save',
        payload
      });
      yield put.resolve({ type: 'fetchList' })
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};