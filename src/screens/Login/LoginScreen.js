import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const LoginScreen = ({ onLogin }) => {
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
        navigate('/');
    };

    return (
      <div className='login-create-account-screen'>
        <Container className='form-container'>
          <h2 className='login-header'>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>
    
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
    
            <Button className='login-button' variant='primary' type='submit'>
              Login
            </Button>

            <div className="mt-3 text-center">
                <p className='create-account-link-container'>Don't have an account?</p>
                <p><Link className="create-account-link" to="/create-account">Create one here</Link></p>
            </div> 
          </Form>
        </Container>
      </div> 
    );
};

export default LoginScreen;