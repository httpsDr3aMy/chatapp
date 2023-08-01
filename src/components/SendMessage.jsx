import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SendMessage = () => {
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async (event) => {
    if(inputValue === ''){
        alert('PUSTA WIADOMOŚĆ')
    }
    else{
        event.preventDefault();
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, 'messages'), {
          message: inputValue,
          user: displayName,
          uid,
          timeStamp: serverTimestamp(),
          pfp: photoURL
        });
        setInputValue('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage(event);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form onSubmit={sendMessage}>
      <div className="form__box">
      <input
        type="text"
        placeholder='Wiadomość...'
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
        onKeyPress={handleKeyPress}
      />
        <button type="submit">
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
