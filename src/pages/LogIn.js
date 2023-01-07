import React, {useState} from 'react';
import {supabase} from "../lib/supabaseClient";
export default function LogIn() {
  const [message,setMessage] = useState('')
  const LogInGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    setMessage('Signed in with GitHub')
  }
  const LogInGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    setMessage('work in progress')
  }

  const LogInFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook'
    })
    setMessage('Signed in with Facebook')
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    setMessage('You have signed out')
  }

  return (
    <>
      <h1>Login</h1>
      <button onClick={LogInGitHub} >Login with github</button>
      <button onClick={LogInGoogle} >Log in with Google</button>
      <button onClick={LogInFacebook} >Log in with facebook</button>
      <div> <a href = '/SignUp.js'>Create an account</a></div>

      <div>
        <button onClick={signOut}>sign out</button>
      </div>

      {message && <p className='message'>{message}</p>}
    </>
  );
}

