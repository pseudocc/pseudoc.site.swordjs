import React from 'react';
import { Router } from '@reach/router';
import * as Routes from './routes';

const App = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Routes.HomePage path='/' />
      <Routes.LoginPage path='/login' />
    </Router>
  </React.Suspense>
);

export default App;
