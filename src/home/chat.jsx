import React from "react";

export function Chat() {
  const [chatFeed, setChatFeed] = React.useState([]);
  const [userMessage, setUserMessage] = React.useState("");

  React.useEffect(() => {
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

  function checkIfEnter(e) {
    if (e.key === "Enter" && userMessage.trim()) {
      const message = (
        <li key={Date.now()}>
          <h4>
            {new Date().toLocaleTimeString()} |{" "}
            {localStorage.getItem("username")}
          </h4>
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
  );
}
