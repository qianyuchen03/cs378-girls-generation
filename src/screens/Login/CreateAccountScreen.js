import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const CreateAccountScreen = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
        navigate('/');
    };

    return (
      <div className='login-create-account-screen'>
        <Container className='form-container'>
          <h2 className='login-header'>Create Account</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control style={{ marginTop: '0px' }}type='text' placeholder='Enter your name' />
            </Form.Group>
    
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>
    
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
    
            <Button className='login-button' variant='primary' type='submit'>
              Create Account
            </Button>
          </Form>
        </Container>
      </div>
    );
};

export default CreateAccountScreen;