import React from 'react';
import './HomeScreen.css';
import { Container } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <Container className="py-4">
      <h2>Welcome to the App</h2>
      <p>This is the home screen. Click on the Users icon below to see the users screen.</p>
    </Container>
  );
};

export default HomeScreen;