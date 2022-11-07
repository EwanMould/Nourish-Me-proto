import React from 'react';
import './styles.css'
import apple from './apple.png'

export default function NavBar() {
    return (
        <nav className= 'nav'>
            <a href= './pages/HomePage.js'> <img className={'logo'} src= {apple} alt = 'apple'/></a>
            <ul>
                <a href = './pages/Pantry.js'><li>Pantry</li></a>
                <a href= './pages/Meal-Curator.js'><li>Meal Curator</li></a>
                <a href = './pages/Tracking.js'><li>Health Tracker</li></a>
                <a href = './pages/LogIn.js'><li className= 'logIn'>Log in</li></a>
            </ul>
        </nav>
    );
}
