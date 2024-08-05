import React from 'react';
import axios from 'axios';
import 'regenerator-runtime';

const url = 'http://localhost:3000/quick-search?searchString';
const defaultTextObject = { text: '', color: 'gray' };

const useGetProducts = () => {
  const [searchData, setSearchData] = React.useState('');
  const [dataReturned, setdataReturned] = React.useState({
    allData: {},
    isLoading: false,
  });
  const [errorMessage, setErrorMessage] = React.useState(defaultTextObject);

  const getData = async () => {
    try {
      setdataReturned({ allData: {}, isLoading: true });
      const searchedData = await axios.get(`${url}=${searchData}`);
      setErrorMessage(defaultTextObject);
      setdataReturned({ allData: searchedData, isLoading: false });
    } catch (error) {
      const { message } = error;
      if (message.includes('Network'))
        setErrorMessage({
          text: 'Network Error',
          color: 'red',
        });
      if (message.includes('500'))
        setErrorMessage({
          text: 'Internal Server Error',
          color: 'red',
        });
      if (message.includes('404'))
        setErrorMessage({
          text: 'Not found!',
          color: 'red',
        });
    }
  };
  React.useEffect(() => {
    if (searchData.length > 0) getData();
    if (searchData.length === 0)
      setdataReturned({ allData: {}, isLoading: false });
  }, [searchData]);
  return {
    setSearchData,
    dataReturned,
    errorMessage,
    searchData,
    setErrorMessage,
  };
};

export default useGetProducts;
