import React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { BsPlus } from 'react-icons/bs';

const Header = ({ navigate, filterStatus, setFilterStatus, filt }) => {
  return (
    <>
      <Button
        variant="contained"
        startIcon={<BsPlus />}
        title="Add New Task"
        onClick={(e) => {
          e.preventDefault();
          navigate('/second');
        }}>
        New Task
      </Button>

      <FormControl style={{ width: '150px' }}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={filterStatus}
          label="Filter"
          size="small"
          onChange={(e) => {
            setFilterStatus(e.target.value);
            filt(filterStatus);
          }}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="done">Completed</MenuItem>
          <MenuItem value="todo">To Do</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Header;
