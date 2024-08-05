import React from 'react';
import { hot } from 'react-hot-loader/root';
import useGetProducts from './useGetProducts';
import Spinner from '../Spinner';
import SearchIcon from '../SearchIcon';
import './QuickSearch.less';

const Error = ({ children, color }) => (
  <p className='Error' style={{ color }}>
    {children}
  </p>
);

const ApiModal = ({ dataReturned }) => {
  const returnedProducts = dataReturned?.data?.products?.map((product) => {
    return (
      <div key={product.name} className='ApiModal'>
        <img src={product.image} width={80} />
        <div>
          <b>{product.designerCategoryName}</b>
        </div>
        <div>{product.name}</div>
      </div>
    );
  });

  return returnedProducts?.length > 0 ? (
    <div className='ApiModalBox'>{returnedProducts}</div>
  ) : null;
};

export default hot(() => {
  const { setSearchData, dataReturned, errorMessage, searchData } =
    useGetProducts();

  const searchChangeHandler = (e) => {
    const enteredValue = e.target.value;
    setSearchData(enteredValue);
  };

  const areResultsEmpty =
    dataReturned.allData.data?.products?.length === 0 &&
    searchData.length > 0 &&
    errorMessage.text.length === 0;

  return (
    <div className='QuickSearch'>
      <div className='Input-container'>
        <input onChange={searchChangeHandler} className='Input' />
        {dataReturned.isLoading ? (
          <Spinner width={16} />
        ) : (
          <SearchIcon width={16} />
        )}
      </div>
      <ApiModal dataReturned={dataReturned.allData} />
      {errorMessage.text.length > 0 ? (
        <Error color={errorMessage.color}>{errorMessage.text}</Error>
      ) : null}
      {areResultsEmpty ? (
        <Error color={'gray'}>
          No result found for <b>{searchData}</b>
        </Error>
      ) : null}
    </div>
  );
});
