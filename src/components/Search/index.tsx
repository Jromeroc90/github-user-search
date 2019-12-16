import React, { useEffect, useRef } from 'react';
import { OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

type SearchProps = {
  text: string,
  onChange(text): void,
  onSearch(): void,
}

const Search: React.FC<SearchProps> = ({ text, onChange, onSearch }) => {
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.addEventListener('keydown', searchUser);
    }

    return () => {
      if (inputRef && inputRef.current) {
        inputRef.current.removeEventListener('keydown', searchUser);
      }
    }
  });

  const searchUser = (e): void => {
    if (e.key === 'Enter') {
      onSearch()
    }
  };

  return (
    <OutlinedInput
      labelWidth={0}
      autoFocus
      fullWidth
      value={text}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Search users ...'
      inputRef={inputRef}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label='search github username'
            edge='end'
            onClick={() => onSearch()}
          >
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  )
};

export default Search;