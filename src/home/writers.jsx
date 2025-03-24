import React from "react";

import { NavLink } from "react-router-dom";

export function Writers() {
  const [writersFollowed, setWritersFollowed] = React.useState([]);

  React.useEffect(() => {
    // Should be a service call to database to get the writers the user follows
    setWritersFollowed(
      JSON.parse(localStorage.getItem("writersFollowed")) || []
    );

    // fetch('/api/articles')
    //   .then((response) => response.json())
    //   .then((articles) => {
    //     setRecentArticlesFeed(articles);
    //   });

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

  return (
    <div className="writers">
      <h2>Writers You Follow</h2>
      <ul className="following">{writers}</ul>
      <NavLink className="nav-link discover" to="/discover">
        Discover
      </NavLink>
    </div>
  );
}
