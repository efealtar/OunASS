import React from 'react';
import axios from 'axios';
import 'regenerator-runtime';

const url = 'http://localhost:3000/quick-search?searchString=';
const defaultTextObject = { text: '', color: 'gray' };

const useGetProducts = () => {
  const [searchData, setSearchData] = React.useState('');
  const [dataReturned, setDataReturned] = React.useState({
    allData: {},
    isLoading: false,
  });
  const [errorMessage, setErrorMessage] = React.useState(defaultTextObject);

  const cancelTokenSource = React.useRef(axios.CancelToken.source());

  const getData = async () => {
    if (searchData.trim() === '') {
      setDataReturned({ allData: {}, isLoading: false });
      return;
    }

    try {
      // Indicate loading state before the request
      setDataReturned((prevState) => ({ ...prevState, isLoading: true }));

      cancelTokenSource.current.cancel(
        'Operation canceled due to new request.',
      );
      cancelTokenSource.current = axios.CancelToken.source();

      const response = await axios.get(`${url}${searchData}`, {
        cancelToken: cancelTokenSource.current.token,
      });

      // Set the data and indicate loading is complete
      setDataReturned({ allData: response.data, isLoading: false });
      setErrorMessage(defaultTextObject);
    } catch (error) {
      if (!axios.isCancel(error)) {
        const message = error.response
          ? error.response.data.message
          : error.message;
        setErrorMessage({ text: message, color: 'red' });
        // Indicate loading is complete even on error
        setDataReturned((prevState) => ({ ...prevState, isLoading: false }));
      }
    }
  };

  React.useEffect(() => {
    getData();

    // Cleanup function to cancel ongoing requests when the component unmounts or searchData changes
    return () => {
      cancelTokenSource.current.cancel(
        'Component unmounted or searchData changed',
      );
    };
  }, [searchData]);

  return {
    setSearchData,
    dataReturned,
    errorMessage,
  };
};

export default useGetProducts;
