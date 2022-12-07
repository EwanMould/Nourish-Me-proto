import React from 'react';
import {supabase} from "../lib/supabaseClient";


export default function LogIn() {


    const logInGitHub = async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'github'
      })
    }

    return (
      <>
        <h1>Login</h1>
        <button onClick={logInGitHub}>Login with github</button>
      </>
    );

}
