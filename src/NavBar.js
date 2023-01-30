import React, {useEffect} from 'react';
import './styles.css'
import apple from './apple.png'
import {supabase} from "./lib/supabaseClient";

export default function NavBar() {
  useEffect(() => {
      const getUser = async () => {
        try {
          const user = await supabase.auth.getUser();
          localStorage.setItem('id', user.data.user.id)
          let {data, error} = await supabase
            .from('profiles')
            .select('id , full_name')
            .eq('id', user.data.user.id)

          if (data) {
            const {full_name} = data[0];
            localStorage.setItem('name', full_name)
          }

        } catch (error) {
          alert(error.message)
        }
        getUser().then()
      }
    },
    []);



  return (
    <nav className='nav'>
      <a href='/HomePage.js'> <img className={'logo'} src={apple} alt='apple'/></a>
      <ul>
        <CustomLink href='/Pantry.js'>Pantry</CustomLink>
        <CustomLink href='/Meal-Curator.js'>Meal Curator</CustomLink>
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
