import  React from 'react';
import './styles.css'
import apple from './apple.png'

export default function NavBar() {

    return (
        <nav className= 'nav'>
            <a href= '/HomePage.js'> <img className={'logo'} src= {apple} alt = 'apple'/></a>
            <ul>
              <CustomLink href = '/Pantry.js'>Pantry</CustomLink>
              <CustomLink href = '/Meal-Curator.js'>Meal Curator</CustomLink>
              <CustomLink href = '/Tracking.js'>Health Tracking</CustomLink>
              <CustomLink href= '/LogIn.js'>Log In</CustomLink>
            </ul>
        </nav>
    );
}
function CustomLink({href,children,...props}){
  const path = window.location.pathname
  return(
    <li className={path === href ? "active" : ""}>
      <a href = {href} {...props}>{children}</a>
    </li>
  )
}
