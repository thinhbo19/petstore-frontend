import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const ChatList = ({ filteredUserList, chatId, onUserClick }) => {
  return (
    <div className="chatlist__user">
      <div className="chatlist__content">
        {filteredUserList.map((user) => (
          <Link
            to={`/CustomerMessages/${user.chats[0]}`}
            key={user._id}
            className={`chatlist__item ${
              chatId === user.chats[0] ? "active" : ""
            }`}
            onClick={() => onUserClick(user.username, user.avatar)}
          >
            {" "}
            <div className="noitifiDoc"></div>
            <Avatar src={user.Avatar} alt="Avatar" />
            <div className="chatlist__info">
              <div className="chatlist__username">
                <h3>{user.username}</h3>
                <p>
                  Với các thuộc tính này, đoạn văn bản sẽ tự động xuống dòng và
                  hiển thị dấu ba chấm nếu vượt quá số dòng quy định.
                </p>
              </div>
              <div className="chatlist__message">
                <p>19/03/2003</p>
                <div className="numbermess">
                  <p>2</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
