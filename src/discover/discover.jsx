import React from "react";
import "./discover.css";

export function Discover() {
  const [allWriters, setAllWriters] = React.useState([]);
  const [writersFollowed, setWritersFollowed] = React.useState(
    JSON.parse(localStorage.getItem("writersFollowed")) || []
  );

  React.useEffect(() => {
    // Should be a service call to database to get all the writers on the platform
    setAllWriters([
      "Billy Bob",
      "Joe Schmoe",
      "Jane Doe",
      "Peter Piper",
      "John Doe",
      "Sally Seashell",
    ]);
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
              <h2>{writer}</h2>
              <button className="follow-button" onClick={() => updateFollowing(writer)}>{buttonText}</button>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore,
              est eveniet magni dicta tempore aperiam deserunt eos! Veniam vero
              cum adipisci hic non numquam quibusdam aperiam sapiente, quo
              officiis inventore ex quae repudiandae eum eaque doloremque quidem,
              nulla laudantium quod doloribus voluptatum! Nihil quam saepe
              pariatur veniam. Nihil atque velit illum aut in necessitatibus
              explicabo. Ipsa dolorum, dolores esse corporis praesentium,
              inventore, id tempora expedita aliquam ad laudantium modi
              consectetur asperiores animi sunt cumque. Facere consequuntur odio
              aliquid id magni, sed et sequi. In reprehenderit praesentium sit
              alias eius atque quas nemo repudiandae doloremque architecto quis
              debitis ipsum, dolore vel?.
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
