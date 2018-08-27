import React from 'react';
import styles from './index.less'
import ReactLoading from 'react-loading'
const HasShow = (evalParam, ReactNode) => (WrappedComponent) => {
  const failReturn = ReactNode || (
    <div className={styles['loading']}>
      <ReactLoading type='bubbles' color='blue' height={200} width={130} />
    </div>
  );
  return function (props) {
    try {
      if (eval(evalParam)) {
        // 有这个
        return (
          <WrappedComponent {...props} />
        )
      } else {
        return failReturn;
      }
    } catch (error) {
      return failReturn;
    }  
  }
}

export default HasShow;