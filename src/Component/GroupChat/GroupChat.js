import React, { useEffect, useState } from "react";
import { GroupChatField } from "./GroupChatField";
import { getLocalStorage, setLocalStorage } from "../../Common/Storage";
import moment from "moment";


const GroupChat = () => {

  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");

  const GroupChat = getLocalStorage("groupchat")
    ? JSON.parse(getLocalStorage("groupchat"))
    : [];

  const [allChat, setAllChat] = useState(GroupChat.length > 0 ? GroupChat : []);
  const [userNameId, setUserNameId] = useState(
    getLocalStorage("loggedInUser")
      ? JSON.parse(getLocalStorage("loggedInUser"))
      : 0
  );

  useEffect(() => {
    const loggedInUser = getLocalStorage("loggedInUser")
      ? JSON.parse(getLocalStorage("loggedInUser"))
      : [];
    setUserName(loggedInUser[0]?.username);
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    let date = new Date();
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const formattedTime = moment(date).format("HH:mm:ss");
    const data = {
      id: userNameId,
      username: userName,
      text: text,
      time: formattedTime,
      date: formattedDate,
    };
    allChat.push({ ...data });
    setLocalStorage("groupchat", allChat);
    setAllChat([...allChat]);
    setText("");
  }


  const handleRefresh = () => {
    setText("");
  };

  return (
    <div>
      <GroupChatField
        userName={userName}
        text={text}
        handleChange={handleChange}
        allChat={allChat}
        handleSend={handleSend}
        handleRefresh={handleRefresh}
      />
    </div>
  );
};

export default GroupChat;
