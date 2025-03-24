import React from "react";
import "./discover.css";

export function Discover() {
  const [allWriters, setAllWriters] = React.useState([]);
  const [writersFollowed, setWritersFollowed] = React.useState(
    JSON.parse(localStorage.getItem("writersFollowed")) || []
  );

  React.useEffect(() => {

    fetch('/api/writers')
      .then((response) => response.json())
      .then((writers) => {
        setAllWriters(writers);
      });

  }, []);

  function updateFollowing(writer) {
    console.log(writer);
    if (writersFollowed.includes(writer)) {
      const updatedWriters = writersFollowed.filter((w) => w !== writer);
      setWritersFollowed(updatedWriters);
      localStorage.setItem("writersFollowed", JSON.stringify(updatedWriters));
    } else {
      const updatedWriters = [...writersFollowed, writer];
      setWritersFollowed(updatedWriters);
      localStorage.setItem("writersFollowed", JSON.stringify(updatedWriters));
    }
  }

  const writers = [];
  if (allWriters.length) {
    for (const [i, writer] of allWriters.entries()) {
      let buttonText = 'Follow'
      if (writersFollowed.includes(writer)) {
        buttonText = 'Unfollow'
      }

      writers.push(
        <div className="writer" key={i}>
          <img src="writer1.jpg" width="30%" className="discover-img" />
          <div className="name-bio">
            <div className="name-follow">
              <h2>{writer.writer}</h2>
              <button className="follow-button" onClick={() => updateFollowing(writer)}>{buttonText}</button>
            </div>
            <p>
              {writer.bio}
            </p>
          </div>
        </div>
      );
    }
  } else {
    writers.push(
      <span>No Writers Exist</span>
    );
  }

  return (
    <main>
      {writers}
    </main>
  );
}
