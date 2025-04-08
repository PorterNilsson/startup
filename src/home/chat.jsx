import React from "react";
import { ChatEvent, ChatNotifier } from './chatNotifier';

export function Chat() {
  const [chatFeed, setChatFeed] = React.useState([]);
  const [userMessage, setUserMessage] = React.useState("");

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    // setInterval(() => {
    //   const names = ["jennifer", "gwen", "burt", "patrick", "harris"];
    //   const randomName = names[Math.floor(Math.random() * names.length)];
    //   const randomMessage =
    //     "Random Message: " + (Math.floor(Math.random() * 100) + 1);

    //   const newMessage = (
    //     <li key={Date.now()}>
    //       <h4>
    //         {new Date().toLocaleTimeString()} | {randomName}
    //       </h4>
    //       <p>{randomMessage}</p>
    //     </li>
    //   );

    //   setChatFeed((prevFeed) => {
    //     const updatedFeed = [...prevFeed, newMessage];
    //     if (updatedFeed.length > 6) {
    //       updatedFeed.shift();
    //     }
    //     return updatedFeed;
    //   });
    // }, 5000);

    ChatNotifier.addHandler(handleChatEvent);

    return () => {
      ChatNotifier.removeHandler(handleChatEvent);
    };
  }, []);

  function handleChatEvent(event) {
    setEvent([...events, event]);
  }

  function checkIfEnter(e) {
    if (e.key === "Enter" && userMessage.trim()) {
      const message = (
        <li key={Date.now()}>
          <h4>
            {new Date().toLocaleTimeString()} | {" "}
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

      ChatNotifier.broadcastEvent(localStorage.getItem("username"), ChatEvent.Chat, {userMessage});
    }
  }

  function createMessageArray() {
    for (const [i, event] of events.entries()) {
      let message = 'unknown';
      if (event.type === ChatEvent.Chat) {

        const newMessage = (
          <li key={Date.now()}>
            <h4>
              {new Date().toLocaleTimeString()} | {event.from}
            </h4>
            <p>{event.value}</p>
          </li>
        );
  
        setChatFeed((prevFeed) => {
          const updatedFeed = [...prevFeed, newMessage];
          if (updatedFeed.length > 6) {
            updatedFeed.shift();
          }
          return updatedFeed;
        });
      }
    }
    return chatFeed
  }

  return (
    <div className="chat">
      <h2>Chat</h2>
      <ul>{createMessageArray()}</ul>
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
