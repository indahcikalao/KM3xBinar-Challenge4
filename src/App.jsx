import { Container } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Second from './Pages/Second/Second';

function App() {
  return (
    <Container className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/second" element={<Second />} />
          <Route path="/second/:id" element={<Second />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
