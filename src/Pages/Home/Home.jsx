import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Divider, Stack, Button, Container } from '@mui/material';

import Header from './components/Header';
import SearchForm from './components/SearchForm';
import TodoList from './components/TodoList';

export default function Home() {
  const [refetchData, setRefetchData] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('https://fake-api-coba.herokuapp.com/todos/');
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefetchData(false);
    }
  };

  function deleteDone() {
    Promise.all(
      filtered
        .filter((e) => e.complete)
        .map(async ({ id }) => {
          await axios
            .delete(`https://fake-api-coba.herokuapp.com/todos/${id}`)
            .then(() => {
              console.log('done');
              setRefetchData(true);
            });
        })
    );
  }

  function deleteAll() {
    Promise.all(
      filtered.map(async ({ id }) => {
        await axios
          .delete(`https://fake-api-coba.herokuapp.com/todos/${id}`)
          .then(() => {
            console.log('done');
            setRefetchData(true);
          });
      })
    );
  }

  function filt() {
    switch (filterStatus) {
      case 'done':
        setFiltered(data.filter((item) => item.complete));
        break;
      case 'todo':
        setFiltered(data.filter((item) => !item.complete));
        break;
      case 'search':
        handleSearch(search);
        break;
      default:
        setFiltered(data);
        break;
    }
    setRefetchData(true);
  }

  function handleSearch(isi) {
    let matches = [];
    if (isi.length > 0) {
      matches = data.filter((item) => {
        const regex = new RegExp(`${isi}`, 'gi');
        return item.task.match(regex);
      });
    }

    console.log(matches);
    setFiltered(matches);
    setSearch(isi);

    if (isi.length === 0) {
      setFilterStatus('all');
    }
  }

  useEffect(() => {
    if (refetchData) {
      fetchData();
    }
    filt();
  }, [refetchData, filterStatus]);

  return (
    <div>
      <Container maxWidth="sm">
        <div className="upper">
          <Header
            navigate={navigate}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filt={filt}
          />
        </div>

        <Divider>
          <h1 style={{ margin: '.8em 0 0 0' }}>Things To Do . . .</h1>
        </Divider>

        <SearchForm
          search={search}
          setFilterStatus={setFilterStatus}
          handleSearch={handleSearch}
        />

        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          style={{ paddingBottom: '.5em' }}>
          <Button variant="contained" onClick={() => deleteDone()}>
            Delete Done Task
          </Button>
          <Button variant="contained" onClick={() => deleteAll()}>
            Delete All Task
          </Button>
        </Stack>

        {loading ? (
          <p>loading ... </p>
        ) : data.length !== 0 ? (
          <TodoList
            navigate={navigate}
            filtered={filtered}
            setRefetchData={setRefetchData}
          />
        ) : (
          <p> No Task To Do ! </p>
        )}
      </Container>
    </div>
  );
}
