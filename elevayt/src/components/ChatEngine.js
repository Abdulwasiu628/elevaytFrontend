/* eslint-disable no-unused-vars */
import React, {useEffect, useMemo, useState, useCallback} from "react";
import { io } from "socket.io-client";

import PropTypes from "prop-types";

const ChatEngine = ({chatMessage, username, roomId}) => {
  const socket = io("http://localhost:5000", {
    path: "/chat",
    reconnectionDelay: 10000,
  });
  const [isConnected, setIsConnected] = useState(false);
  const handleConnect = useCallback(() => {
    console.log("Connected to server:", socket.id);
    setIsConnected(true);
  }, []);
  const handleDisconnect = useCallback(() => {
    console.log("Disconnected from server");
    setIsConnected(false);
  }, []);
  useEffect(() => {
    handleConnect();
    handleDisconnect();
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    return () => {
      // Clean up event listener when component unmounts
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);
  if (chatMessage !== "" && username !== "") {
    const information = {
      username: username,
      message_content: chatMessage,
      room: roomId,
      timeLog:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    socket.emit("join_user", information);
  }
  socket.on("connect_error", (error) => {
    console.log(error.message);
  });
  useEffect(() => {
    socket.on("recieve", (data) => {
      console.log(data);
    });
  }, [socket]);


  console.log(chatMessage, username, roomId);
  return (
    <div>
        ChatEngine
    </div>

  );
};
ChatEngine.propTypes = {
  chatMessage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired
};
export default React.memo(ChatEngine);