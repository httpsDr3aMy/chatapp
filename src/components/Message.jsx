import React from 'react';
import { auth } from '../firebase';

const Message = ({ message }) => {
  const time = message.timeStamp ? message.timeStamp.toDate() : null;
  const hours = time ? time.getHours() : null;
  const minutes = time ? time.getMinutes().toString().padStart(2, '0') : null;

  const renderMessages = () => {
    if (auth.currentUser.uid === message.uid) {
      return(
        <>
          {time && <span className="timestamp-info">{`${hours}:${minutes}`}</span>}
          <article style={{
            display: 'flex',
            justifyContent: 'end',
            flexDirection: 'row-reverse',
            gap: '10px'
          }}>
            <img src={message.pfp} alt="profile picture" />
            <div className="message message--user">
              <span className="message__user-name message__user-name--user">{message.user}</span>
              <span className="message__message message__message--user">{message.message}</span>
            </div>
          </article>
        </>
      );
    } else {
      return (
        <>
          {time && <span className="timestamp-info">{`${hours}:${minutes}`}</span>}
          <article>
            <img src={message.pfp} alt="profile picture" />
            <div className="message">
              <span className="message__user-name">{message.user}</span>
              <span className="message__message">{message.message}</span>
            </div>
          </article>
        </>
      );
    }
  };

  return renderMessages();
};

export default Message;
