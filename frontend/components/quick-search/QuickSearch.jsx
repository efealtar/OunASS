import React, { useState } from 'react';
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
  const returnedProducts = dataReturned?.data?.products?.map((product) => (
    <div key={product.name} className='ApiModal'>
      <img src={product.image} width={80} />
      <div>
        <b>{product.designerCategoryName}</b>
      </div>
      <div>{product.name}</div>
    </div>
  ));

  return returnedProducts?.length > 0 ? (
    <div className='ApiModalBox'>{returnedProducts}</div>
  ) : null;
};

export default hot(() => {
  const { setSearchData, dataReturned, errorMessage } = useGetProducts();
  const [inputValue, setInputValue] = useState('');
  const [lastSearched, setLastSearched] = useState('');

  const searchChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchData(inputValue);
    setLastSearched(inputValue);
  };

  const areResultsEmpty =
    dataReturned.allData.data?.products?.length === 0 &&
    inputValue.length > 0 &&
    errorMessage.text.length === 0;

  const isSearchUnchanged = inputValue === lastSearched;

  return (
    <div className='QuickSearch'>
      <div className='Input-container'>
        <input
          value={inputValue}
          onChange={searchChangeHandler}
          className='Input'
        />
        <button
          onClick={handleSearchClick}
          className='SearchButton'
          disabled={dataReturned.isLoading || isSearchUnchanged} // Disable if loading or search hasn't changed
        >
          {dataReturned.isLoading ? (
            <Spinner width={16} />
          ) : (
            <>
              <SearchIcon width={16} />
              <div>Search</div>
            </>
          )}
        </button>
      </div>
      <ApiModal dataReturned={dataReturned.allData} />
      {errorMessage.text.length > 0 ? (
        <Error color={errorMessage.color}>{errorMessage.text}</Error>
      ) : null}
      {areResultsEmpty ? (
        <Error color={'gray'}>
          No result found for <b>{inputValue}</b>
        </Error>
      ) : null}
    </div>
  );
});
