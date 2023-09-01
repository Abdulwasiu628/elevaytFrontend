import React, { useState } from "react";
import { ToolTips } from "../materials/Materials";
import { postApis, url } from "../data/getApis";
import "../styles/chatbot.css";

const ChatBot = () => {
  const style = {
    position: "fixed",
    top: "85%",
    left: "90%",
    zIndex: "100",
    backgroundColor: "transparent",
  };
  return (
    <div style={style}>
      <ToolTips
        button={<img src="../question.gif" alt="" width={80} height={80} />}
        display={<Card />}
      />
    </div>
  );
};

const Card = () => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [input, setInput] = useState("");

  const [size, increaseSize] = useState("225px");
  const [left, setLeft] = useState("70%");
  
  const style = {
    width: "280px",
    height: "500px",
    overflowX: "scroll",
    overflowY: "scroll",
  };
  const inputStyle = {
    
    position: "absolute",
    top: "90%",
    width: size,
    height: "30px",
    outline: "grey",
    paddingLeft: "10px",
    transition: "width 0.5s linear",
    borderRadius: "5px",
    border: "solid 1px #3badf7",
    left: "2%",

    "&:hover": {
      background: "transparent",
    },
    "&:focus": {
      background: "transparent",
    },
    "&::placeholder": {
      color: "blue",
    },
  };
  const imageStyle = {
    position: "absolute",
    top: "90.5%",
    left: left,
    transition: "all 0.5s linear",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "32px",
    transform: "translateY(-1px) translateX(6px)",
    borderRadius: "5px",
    border: "none",
    opacity: 0.5,
    backgroundColor: "transparent",
  };
  const changeSize = () => {
    setTyping("typing...");
    increaseSize("265px");
    setLeft("85%");
  };
  const changeSizeBack = () => {
    setTyping("");
    increaseSize("225px");
    setLeft("70%");
  };
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const handleSendMessage = async() => {
    setTyping("Processing...");
    const userMessage = { text: input, isUser: true };
    setMessages([...messages, userMessage]);
    postApis(`${url}/gpt/getChat`, { message: input })
      .then((result) => {
        const response = result[0].message.content;
        
        const chatbotResponse = {
          context: response,
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, chatbotResponse]);
        setTimeout(() => {
          setTyping("");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setTyping("");
        }, 1000);
      });
  
    setInput("");
    
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      handleSendMessage();
      e.preventDefault(); 
    }
  };
  const userMessage = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "flex-start",
    height: "400px",
    alignItems: "flex-start",
    overflowX: "scroll",
    overflowY: "scroll",
    position: "absolute",
    top: "10%",
    width: "99%",
    border: "none",
    borderRadius: "8px",
    marginBottom: "20px",
  };
  const userReply = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };
  const processingStyle = {
    position: "absolute",
    top: "85%",
    left: "70%"

  };
  return (
    <div style={style}>
      <div className="chat-history" style={userMessage}>
        {messages.map((message, index) => (
          <div key={index} style={userReply}>
            <div className={`message ${message.isUser ? "user" : ""}`}>
              {message.text}
            </div>
            <div
              className={`message ${message.isUser === false ? "chatbot" : ""}`}
            >
              {message.context}
            </div>
          </div>
        ))}
      </div>
      <div className="inputContent">
        <div style={processingStyle}>{typing}</div>
        <input
          type="text"
          style={inputStyle}
          onFocus={changeSize}
          onBlur={changeSizeBack}
          placeholder={"Send a message"}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSendMessage} style={imageStyle}>
          <img src="../send-message.png" alt="message" width={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
