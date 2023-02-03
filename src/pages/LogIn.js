import React, {useState} from 'react';
import {supabase} from "../lib/supabaseClient";
export default function LogIn() {
  const [message,setMessage] = useState('')
  const LogInGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    alert('Signed in with GitHub')
  }

  const LogInFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook'
    })
    alert('Signed in with Facebook')
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    setMessage('You have signed out')
    localStorage.clear();
    if(error){
      setMessage(error.message);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <button onClick={LogInGitHub} >Login with github</button>
      <button onClick={LogInFacebook} >Login with facebook</button>
      <div>
        <button onClick={signOut}>sign out</button>
      </div>

      {message && <p className='message'>{message}</p>}
    </>
  );
}

