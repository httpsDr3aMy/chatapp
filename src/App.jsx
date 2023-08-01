import React, { useEffect } from 'react';
import Login from './components/Login';
import './css/style.css';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatApp from './components/ChatApp';
import { SyncLoader } from 'react-spinners';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getDoc } from 'firebase/firestore';
const App = () => {
  const [user, loading] = useAuthState(auth);

  const addUser = async () => { 
    try {
      if (auth.currentUser) {
        const { displayName, photoURL, uid, email } = auth.currentUser;
        const userRef = doc(db, 'users', uid);

        // Sprawdź, czy użytkownik o danym uid już istnieje w kolekcji "users"
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          // Dodaj nowego użytkownika do kolekcji "users"
          await setDoc(userRef, {
            user: displayName,
            email,
            uid,
            pfp: photoURL
          });
        }
      }
    } catch (error) {
      console.error('Błąd podczas dodawania użytkownika:', error);
    }
  };
  
  useEffect(() => {
    if (user) {
      addUser();
    }
  }, [user]); 
  
  if (user) {
    return (
      <ChatApp />
    )
  }

  if (loading) {
    return <SyncLoader color="rgba(255, 255, 255, 1)" style={{
      position: 'absolute',
      left: '50%',
      top: '50%'
    }}/>
  }

  return (
    <div className="App">
      <Login />
    </div>
  );
};

export default App;
