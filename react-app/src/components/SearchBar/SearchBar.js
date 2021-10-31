import React, { useState } from 'react';
import './SearchBar.css';
import { useHistory } from 'react-router-dom';


function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  let API_Call = `https://cloud.iexapis.com/stable/ref-data/iex/symbols?token=${process.env.REACT_APP_API_KEY}`;

  const getInfo = () => {
    console.log('Getting info from API...');
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((item) => {
          return item.name.toLowerCase().startsWith(query.toLocaleLowerCase()) || item.symbol.toLowerCase().startsWith(query.toLocaleLowerCase());
        });
        // console.log(filteredData);
        setSearchResults(filteredData);
      })

      .catch((e) => {
        console.log({ error: e });
      });
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (query && query.length > 0) {
      getInfo();
    }
  };

  const handleQueryResultClick = (value) => {
    history.push(`/stock-data/${value}`);
    window.location.reload()
    setQuery('')
  };



  const results = React.Children.toArray(
    searchResults.map((item, idx) => (
      <li className='result-item' id={idx}  onClick={() => handleQueryResultClick(item.symbol)}>
          <div className='result-symbol'> { item.symbol}</div>
          <div className='result-name'>{item.name }</div>
      </li>
    ))
  );

  return (
    <form className='search-form-container'>
      <input
        placeholder='Search'
        onChange={handleInputChange}
        value={query}
      />
      <div className='query-results-list'>
        {query.length > 1 && <ul>{results}</ul>}
      </div>
    </form>
  );
}

export default SearchBar;
