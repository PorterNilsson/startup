import React from 'react';
import './app.css';

export default function App() {
  return <div className="body">
    <header>
      <h1>Devotee</h1>
      <nav>
        <span>Username</span> <span>|</span>
        <a href="index.html">
          <button className="nav-button">Logout</button>
        </a>
        <span>|</span>
        <a href="home.html">
          <button className="nav-button">Home</button>
        </a>
      </nav>
    </header>

    <main>Content will go here!</main>

    <footer>
      <h3 className="footer">Porter Nilsson</h3>
      <a href="https://github.com/PorterNilsson/startup" class="footer">GitHub</a>
    </footer>
  </div>;
}