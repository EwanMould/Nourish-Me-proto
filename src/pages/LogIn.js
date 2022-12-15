import React from 'react';
import {supabase} from "../lib/supabaseClient";
export default function LogIn() {

    const LogInGitHub = async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'github'
      })
    }
    const LogInGoogle = async  () => {
      await  supabase.auth.signInWithOAuth({
        provider: 'google'
      })
    }
    return (
      <>
        <h1>Login</h1>
        <button onClick={LogInGitHub}>Login with github</button>
        <button onClick={LogInGoogle}>Log in with Google</button>
        <div>
          <button>Don't have an account? Sign up here</button>
        </div>
      </>
    );

}
