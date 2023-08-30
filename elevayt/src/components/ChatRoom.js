/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import ChatEngine from "./ChatEngine";

const ChatRoom = () => {
  const initialMessages = {
    message: "",
    username: "",
  };
  const value = uuidv4();
  const [_message, setMessage] = useState(initialMessages);
  const [changeSpace, setSpace] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    setRoomCode(value);
    event.preventDefault();
    
  };
  
  const handleEvent = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const handleFocus = () => {
    setSpace(true);
  };
  const handleBlur = () => {
    setSpace(false);
  };
  useEffect(() => {
    if (changeSpace) {
      handleFocus();
    }
  }, [changeSpace]);
  return (
    <div>
      <ChatEngine
        chatMessage={_message.message}
        username={_message.username}
        roomId={roomCode}
      />
      <h1 className="text-center">Chat Box</h1>
      <br />
      <input
        type="text"
        onChange={handleChange}
        value={_message.message}
        name="message"
      />
      <br />
      <br />
      <textarea
        cols="25"
        rows="2"
        placeholder="type here..."
        onChange={handleChange}
        value={_message.username}
        name="username"
        onKeyDown={handleEvent}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        Textbox
      </textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ChatRoom;
