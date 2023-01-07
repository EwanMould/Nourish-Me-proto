import React, {useEffect, useState} from 'react';
import './styles.css'
import apple from './apple.png'
import {supabase} from "./lib/supabaseClient";

export default function NavBar() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    try {
      const user = await supabase.auth.getUser();
      localStorage.setItem('id', user.data.user.id)
      let {data, error, status} = await supabase
        .from('profiles')
        .select(`full_name`)
        .eq('id', user.data.user.id)
        .single();

      if(data){
        setName(user.data.user.aud)
        console.log(name);
      }

    } catch (error) {
      alert(error.message)
    }finally {
      setLoading(false)
    }
  };

  return (
    <nav className='nav'>
      <a href='/HomePage.js'> <img className={'logo'} src={apple} alt='apple'/></a>
      <ul>
        <CustomLink href='/Pantry.js'>Pantry</CustomLink>
        <CustomLink href='/Meal-Curator.js'>Meal Curator</CustomLink>
        <CustomLink href='/Tracking.js'>Health Tracking</CustomLink>
        <CustomLink href='/LogIn.js'>Log In</CustomLink>
      </ul>
    </nav>
  );


  function CustomLink({href, children, ...props}) {
    const path = window.location.pathname
    return (
      <li className={path === href ? "active" : ""}>
        <a href={href} {...props}>{children}</a>
      </li>
    )
  }
}
