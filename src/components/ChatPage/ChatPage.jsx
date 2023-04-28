import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { aChat } from "../../utilities/chat-api";
import { getUser } from "../../utilities/users-api";

function ChatPage({ user, handleChat, chatID}) {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [chatRoom, setchatRoom] = useState(null);
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    async function setRoom() {
      const newRoom = await aChat(chatID)
      setchatRoom(newRoom)
      // const chatUsers = await findUsers(newRoom.users)
    }
    setRoom()
  }, [chatID])

  useEffect(() => {
    async function chatUsers() {
      if (chatRoom.users[0] !== user._id) {
        const friend = await getUser(chatRoom.users[0])
        setFriend(friend)
      } else {
        const friend = await getUser(chatRoom.users[1])
        setFriend(friend)
      }
    }
    chatRoom && chatUsers()
  }, [chatRoom])

  const socketRef = useRef();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io({
        autoConnect: false,
      });
    }
    const socket = socketRef.current;

    // socketRef.current.auth = {
    //   token: localStorage.getItem("token"),
    // };

    socket.connect();

    socket.on("newMsg", (msg) => {
      setMsgs((msgs) => [...msgs, msg]);
    });

    return () => {
      socket.off("newMsg");
      socket.disconnect();
    };
  }, []);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { msg: input, user: user.name };
    setMsgs((msgs) => [...msgs, data]);
    socketRef.current.emit("sendMsg", data);
    setInput("");
  }

  return (
    <div className="ChatPage">
      <h1>Chat with {friend && friend.name}</h1> <button onClick={handleChat}>Exit Chat</button>
      <div className="chat-box">
        <ul className="chat-items">
          {msgs.map((data, idx) => {
            return (
              <li className={data.user} key={data + idx}>
                <span>{data.user}: </span>
                {data.msg}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="chat-wrapper">
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
