import React, { useState } from 'react';

function Search({searchTransaction}) {
  const [inputValue, setInputValue] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchTransaction(value);
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={inputValue}
        onChange={handleChange}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
