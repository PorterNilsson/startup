import React from 'react';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Discover } from './discover/discover';
import { Home } from './home/home';
import { Writer } from './writer/writer';

export default function App() {
  const [user, setUser] = React.useState(localStorage.getItem('username') || null);

  function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('writersFollowed')
    setUser(null);
  }

  return (
  <BrowserRouter>
    <div className="body">
      <header>
        <h1>Devotee</h1>
        {user && <nav>
          <span>{user}</span> <span>|</span>
          <NavLink className='nav-link' to='/'>
            <button className="nav-button" onClick={logout}>Logout</button>
          </NavLink>
          <span>|</span>
          <NavLink className='nav-link' to='home'>
            <button className="nav-button">Home</button>
          </NavLink>
        </nav>}
      </header>

      <Routes>
        <Route path='/' element={<Login setUser={setUser} exact />} />
        <Route path='/home' element={<Home />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/writer/:writerName' element={<Writer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer>
        <h3 className="footer">Porter Nilsson</h3>
        <a href="https://github.com/PorterNilsson/startup" class="footer">GitHub</a>
      </footer>
    </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}