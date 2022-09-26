import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Divider,
  FormControl,
  TextField,
  Container,
  Stack,
  Button,
} from '@mui/material';

export default function Second() {
  const [task, setTask] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios
        .get(`https://fake-api-coba.herokuapp.com/todos/${params.id}`)
        .then((response) => {
          setTask(response.data.task);
        });
    }
  }, [params.id]);

  function addTask(e) {
    e.preventDefault();
    if (task) {
      axios.post('https://fake-api-coba.herokuapp.com/todos', {
        task: task,
        complete: false,
      });
    }
    navigate('/');
  }

  function editTask(e) {
    e.preventDefault();
    axios
      .patch(`https://fake-api-coba.herokuapp.com/todos/${params.id}`, {
        task: task,
      })
      .then(() => navigate('/'));
  }

  return (
    <div>
      <Container maxWidth="sm">
        <Divider>
          <h1 style={{ margin: '0' }}>Input Task . . .</h1>
        </Divider>

        <FormControl fullWidth>
          <TextField
            label={params.id ? 'Edit Your Task' : 'Add New Task'}
            id="outlined"
            value={task}
            placeholder={params.id ? 'Edit Here' : 'Add Something New'}
            style={{ margin: '1em 4.5em 0.5em 4.5em' }}
            onChange={(e) => setTask(e.target.value)}
          />
        </FormControl>

        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          style={{ paddingBottom: '.5em' }}>
          {params.id ? (
            <Button variant="contained" onClick={editTask}>
              Edit
            </Button>
          ) : (
            <Button variant="contained" onClick={addTask}>
              Submit
            </Button>
          )}
          <Button variant="contained" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
