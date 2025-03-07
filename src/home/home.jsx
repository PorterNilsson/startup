import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

export function Home() {
  const [writersFollowed, setWritersFollowed] = React.useState([]);
  const [displayPane, setDisplayPane] = React.useState("");
  const [randomScripture, setRandomScripture] = React.useState("");
  const [recentArticlesFeed, setRecentArticlesFeed] = React.useState([]);

  function updateDisplayPane(pane) {
    setDisplayPane(pane);
  }

  React.useEffect(() => {
    // Should be a service call to database to get the writers the user follows
    setWritersFollowed(JSON.parse(localStorage.getItem("writersFollowed")) || [])

    setDisplayPane("articles");
    setRandomScripture(
      "The fear of the Lord is the beginning of knowledge: but fools despise wisdom and instruction. (Proverbs 1:7)"
    );
    setRecentArticlesFeed(["Article 1", "Article 2", "Article 3"]);
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
    articleFeed.push(
      <p>No recent articles.</p>
    )
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
          <div className="articles">
            {articleFeed}
          </div>
        )}

        {displayPane === "chat" && (
          <div className="chat">
            <h2>Chat</h2>
            <ul>
              <li>
                <h4>Placeholder Timestamp | Placeholder User</h4>
                <p>Placeholder Chat Message</p>
              </li>
              <li>
                <h4>Placeholder Timestamp | Placeholder User</h4>
                <p>Placeholder Chat Message</p>
              </li>
              <li>
                <h4>Placeholder Timestamp | Placeholder User</h4>
                <p>Placeholder Chat Message</p>
              </li>
              <li>
                <h4>Placeholder Timestamp | Placeholder User</h4>
                <p>Placeholder Chat Message</p>
              </li>
            </ul>
            <input type="text" placeholder="chat" />
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
