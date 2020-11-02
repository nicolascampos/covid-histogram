import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './InputWithSuggestions.scss';

const InputWithSuggestions = ({ options, maxSuggestions, handleStateChange }) => {
  const [ userInput, setUserInput ] = useState('');
  const [ suggestions, setSuggestions ] = useState([]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
    const filteredStates = options.filter((state) => state.name.toLowerCase().includes(userInput.toLowerCase().trim()));

    if (filteredStates && filteredStates.length) {
      setSuggestions(filteredStates.map((option) => 
        <li 
          className="InputWithSuggestions_suggestionsList_item"
          key={option.code}
          statecode={option.code}
          statename={option.name}
          onClick={handleClick}
        >
          {option.name}
        </li>
      ).slice(0, maxSuggestions));
    } else {
      setSuggestions(null);
    }

    if (e.target.value === '') {
      setSuggestions(null);
    } 
  };

  const handleClick = (e) => {
    handleStateChange(e);
    setSuggestions(null);
    setUserInput(e.target.getAttribute('statename'));
  }

  return <div className="InputWithSuggestions">
    <input
      autoComplete="off"
      className="InputWithSuggestions_input"
      id="statesInput"
      placeholder="Choose state"
      type="text"
      value={userInput}
      onChange={handleChange}
    />
    <ul className="InputWithSuggestions_suggestionsList">
      {suggestions}
    </ul>
  </div>;
};

export default InputWithSuggestions;
