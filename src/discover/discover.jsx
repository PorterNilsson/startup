import React from "react";
import "./discover.css";

export function Discover() {
  const [allWriters, setAllWriters] = React.useState([]);
  const [writersFollowed, setWritersFollowed] = React.useState(
    
  );

  React.useEffect(() => {

    // This has to run first as the setAllWriters call relies on the data inside
    fetch('/api/writersFollowed')
    .then((response) => response.json())
    .then((writersFollowed) => {
      setWritersFollowed(writersFollowed);
      return fetch('/api/writers');
    })
    .then((response) => response.json())
    .then((writersData) => {
      setAllWriters(writersData);
    });

  }, []);

  async function updateFollowing(writer) {

    if (writersFollowed.some(followedWriter => followedWriter.writer === writer.writer)) {
      const updatedWriters = writersFollowed.filter((w) => w.writer !== writer.writer);
      setWritersFollowed(updatedWriters);

      await fetch('/api/followUpdate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(updatedWriters),
      });

    } else {
      const updatedWriters = [...writersFollowed, writer];
      setWritersFollowed(updatedWriters);

      await fetch('/api/followUpdate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(updatedWriters),
      });
    }
  }
  
  const writers = [];
  if (allWriters.length) {

    // console.log("WRITERS FOLLOWED");
    // console.log(writersFollowed);

    for (const [i, writer] of allWriters.entries()) {
      let buttonText = 'Follow'

      // console.log("WRITER");
      // console.log(writer);
      if (writersFollowed.some(followedWriter => followedWriter.writer === writer.writer)) {
        // console.log("UNFOLLOW")
        buttonText = 'Unfollow'
      }

      writers.push(
        <div className="writer" key={i}>
          <img src={`${writer.image}.jpg`} width="30%" className="discover-img" />
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
      <div className="writer-div" >
        {writers}
      </div>
    </main>
  );
}
