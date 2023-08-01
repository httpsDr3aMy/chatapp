import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebase';
import Message from './Message';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase'; 
import SendMessage from './SendMessage';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [isUserFound, setIsUserFound] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'messages'), orderBy('timeStamp')),
      (querySnapshot) => {
        let messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messagesData);
      }
    );

    return () => unsubscribe();
  }, []);

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <div className='App'>
      <main className='chatapp'>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <SendMessage />
        <div style={{ padding: '20px' }} ref={contentRef} />
      </main>
      <aside className="panel">
        <FontAwesomeIcon
          onClick={() => auth.signOut()}
          icon={faRightFromBracket}
          className='chatapp__logut-icon'
        />
        <h2 style={{textAlign: 'center'}}>APLIKACJA W TRAKCIE BUDOWY</h2>
      </aside>
    </div>
  );
};

export default ChatApp;
