import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

export function Home() {
  const [writersFollowed, setWritersFollowed] = React.useState([]);
  const [displayPane, setDisplayPane] = React.useState("");
  const [randomScripture, setRandomScripture] = React.useState("");
  const [recentArticlesFeed, setRecentArticlesFeed] = React.useState([]);
  const [chatFeed, setChatFeed] = React.useState([]);
  const [userMessage, setUserMessage] = React.useState('');

  function updateDisplayPane(pane) {
    setDisplayPane(pane);
  }

  React.useEffect(() => {
    // Should be a service call to database to get the writers the user follows
    setWritersFollowed(
      JSON.parse(localStorage.getItem("writersFollowed")) || []
    );

    setDisplayPane("articles");
    setRandomScripture(
      "The fear of the Lord is the beginning of knowledge: but fools despise wisdom and instruction. (Proverbs 1:7)"
    );
    setRecentArticlesFeed(["Article 1", "Article 2", "Article 3"]);

    setInterval(() => {
      const names = ["jennifer", "gwen", "burt", "patrick", "harris"];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomMessage =
        "Random Message: " + (Math.floor(Math.random() * 100) + 1);

      const newMessage = (
        <li key={Date.now()}>
          <h4>
            {new Date().toLocaleTimeString()} | {randomName}
          </h4>
          <p>{randomMessage}</p>
        </li>
      );

      setChatFeed((prevFeed) => {
        const updatedFeed = [...prevFeed, newMessage];
        if (updatedFeed.length > 6) {
          updatedFeed.shift();
        }
        return updatedFeed;
      });
    }, 5000);
  }, []);

  const writers = [];
  if (writersFollowed.length) {
    for (const [i, writer] of writersFollowed.entries()) {
      writers.push(
        <li key={i}>
          <NavLink className="nav-link" to={`/writer/${writer}`}>
            {writer}
          </NavLink>
        </li>
      );
    }
  } else {
    writers.push(
      <li>
        <span>No Writers Followed Yet</span>
      </li>
    );
  }

  const articleFeed = [];
  if (recentArticlesFeed.length) {
    for (const [i, article] of recentArticlesFeed.entries()) {
      articleFeed.push(
        <div className="article">
          <img src={`nature_${i + 1}.jpg`} width="10%" className="img" />
          <div className="article-content">
            <h3>{article}</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              minima asperiores atque repudiandae aliquam architecto animi,
              voluptates, quas dolore impedit odio beatae? Veniam, pariatur amet
              eos itaque assumenda deserunt consequatur sapiente eveniet maiores
              magni aperiam, porro natus nemo, officiis earum?
            </p>
          </div>
        </div>
      );
    }
  } else {
    articleFeed.push(<p>No recent articles.</p>);
  }

  function checkIfEnter(e) {
    if (e.key === 'Enter' && userMessage.trim()) {
      const message = (
        <li key={Date.now()}>
          <h4>{new Date().toLocaleTimeString()} | {localStorage.getItem('username')}</h4>
          <p>{userMessage}</p>
        </li>
      );

      setChatFeed((prevFeed) => {
        const updatedFeed = [...prevFeed, message];
        if (updatedFeed.length > 6) {
          updatedFeed.shift();
        }
        return updatedFeed;
      });

      setUserMessage("");
    }
  }

  return (
    <main>
      <div className="proverb">
        <p>{randomScripture}</p>
      </div>

      <nav className="main-selection">
        <button onClick={() => updateDisplayPane("articles")}>Articles</button>
        <span> | </span>
        <button onClick={() => updateDisplayPane("chat")}>Chat</button>
      </nav>

      <div className="main-content">
        {displayPane === "articles" && (
          <div className="articles">{articleFeed}</div>
        )}

        {displayPane === "chat" && (
          <div className="chat">
            <h2>Chat</h2>
            <ul>{chatFeed}</ul>
            <input
              type="text"
              placeholder="chat"
              className="chat-box"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={checkIfEnter}
            />
          </div>
        )}

        <div className="writers">
          <h2>Writers You Follow</h2>
          <ul className="following">{writers}</ul>
          <NavLink className="nav-link discover" to="/discover">
            Discover
          </NavLink>
        </div>
      </div>
    </main>
  );
}
