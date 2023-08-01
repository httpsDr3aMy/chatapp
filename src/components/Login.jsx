import React from 'react'
import GoogleButton from 'react-google-button'
import { auth } from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import PhonePhoto from '../assets/phone.png'
const Login = () => {
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Błąd logowania:', error);
    }
  };
  
  return (
    <section className="login-box">
        <div className="login-box__content">
            <div className="login-box__content-form">
                <h2 className="login-box__content-form-heading">Witaj <span>👋</span></h2>
                <p className="login-box__content-form-description" >Zaloguj się przez Google</p>
                <GoogleButton onClick={signIn}/>
            </div>
            <img src={PhonePhoto} alt="phone photo" className='image'/>
        </div>
    </section>
  )
}

export default Login