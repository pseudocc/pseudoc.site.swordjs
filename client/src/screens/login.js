import React from 'react';
import axios from 'axios';

const LoginPage = () => {
  axios.post('/api/login');
  return <div>Hello from Login Page</div>;
};

export default LoginPage;
