import React from 'react';
import './login.css';

export function Login() {
  return (
    <main>
      <div className="login-box">
        <h3 className="title">Sign in to Devotee</h3>
        <form method="get" action="/home">
          <div>
            <label>Username</label>
            <input type="text" placeholder="your@email.com" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="password" />
          </div>
          <button type="submit" className="login-button button">Login</button>
          <button type="submit" className="button">Create New User</button>
        </form>
      </div>
    </main>
  );
}