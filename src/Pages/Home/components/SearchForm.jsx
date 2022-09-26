import React from 'react';
import { TextField, FormControl, InputAdornment } from '@mui/material';
import { BsSearch } from 'react-icons/bs';

const SearchForm = ({ search, setFilterStatus, handleSearch }) => {
  return (
    <FormControl fullWidth>
      <TextField
        label="Search"
        id="outlined"
        value={search}
        placeholder="Search Something"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BsSearch />
            </InputAdornment>
          ),
        }}
        style={{ margin: '1em 4.5em' }}
        onChange={(e) => {
          setFilterStatus('search');
          handleSearch(e.target.value);
        }}
      />
    </FormControl>
  );
};

export default SearchForm;
