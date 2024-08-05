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

const ApiModal = ({ dataReturned, hasSearched, isLoading }) => {
  if (!hasSearched) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const products = dataReturned.products;
  if (products && products.length > 0) {
    return (
      <div className='ApiModalBox'>
        {products.map((product) => (
          <div key={product.name} className='ApiModal'>
            <img src={product.image} alt={product.name} width={80} />
            <div>
              <b>{product.designerCategoryName}</b>
            </div>
            <div>{product.name}</div>
          </div>
        ))}
      </div>
    );
  }

  return <div>No products found</div>;
};

export default hot(() => {
  const { setSearchData, dataReturned, errorMessage } = useGetProducts();
  const [inputValue, setInputValue] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const [hasSearched, setHasSearched] = useState(false); // New state to track if search has been initiated

  const searchChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchData(inputValue);
    setLastSearched(inputValue);
    setHasSearched(true); // Update here when search is actually performed
  };

  const areResultsEmpty =
    dataReturned.allData.data?.products?.length === 0 &&
    inputValue.length > 0 &&
    errorMessage.text.length === 0;

  const isSearchUnchanged = inputValue === lastSearched;

  // Add a new condition to check if the input value is empty
  const isInputEmpty = inputValue.trim() === '';

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
          disabled={dataReturned.isLoading || isSearchUnchanged || isInputEmpty} // Disable if loading, search hasn't changed, or input is empty
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
      <ApiModal
        dataReturned={dataReturned.allData}
        hasSearched={hasSearched}
        isLoading={dataReturned.isLoading}
      />
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
