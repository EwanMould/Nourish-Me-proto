import {supabase} from "../lib/supabaseClient";
import React, {useState} from 'react';


export default function SignUp() {
  const [email, setEmail] = useState(''); // email of the user
  const [password, setPassword] = useState(''); // password of the user
  const [Regmsg, setRegMsg] = useState(''); // Registration message
  const [user, setUser] = useState({}); // User object after registration / login

  async function Register(){
    const { error } = await supabase.auth.signInWithOtp({
      email: email
    })

    if(error){
      setRegMsg(error.message)
    }else{
      setRegMsg('User created successfully')
      setUser( async () => {
        const {data, error} = await supabase.auth.getUser();
      })
    }
  }

  return (
    <>
      <div className="App">
        <h1>Register User</h1>
        email:<input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
        <button onClick={Register}>Register</button>
        <p>{Regmsg}</p>
      </div>
    </>
  )
}
