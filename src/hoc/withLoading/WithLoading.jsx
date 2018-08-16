import React from 'react';
import Loading from '../../elements/loading/Loading';

const WithLoading = (Component) => (isLoading, ...rest) => {
  return (
    isLoading
      ? <Loading />
      : <Component { ...rest } />
  )
}

export default WithLoading
