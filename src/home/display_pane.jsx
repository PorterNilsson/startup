import React from "react";

import { Writers } from "./writers";
import { Articles } from "./articles";
import { Chat } from "./chat";

export function DisplayPane() {
  const [displayPane, setDisplayPane] = React.useState("");

  function updateDisplayPane(pane) {
    setDisplayPane(pane);
  }

  React.useState(() => {
    setDisplayPane("articles");
  }, []);

  return (
    <div>
      <nav className="main-selection">
        <button onClick={() => updateDisplayPane("articles")}>Articles</button>
        <span> | </span>
        <button onClick={() => updateDisplayPane("chat")}>Chat</button>
      </nav>

      <div className="main-content">
        {displayPane === "articles" && <Articles />}

        {displayPane === "chat" && <Chat />}

        <Writers />
      </div>
    </div>
  );
}
